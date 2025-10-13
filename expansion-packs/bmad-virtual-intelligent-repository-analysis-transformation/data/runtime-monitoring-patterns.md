# Runtime Monitoring Patterns for Granularity Mismatch Detection

## Overview

This document provides runtime instrumentation patterns to detect granularity mismatches during actual data processing.

## Pattern 1: Map Overwrite Detection

### Purpose
Detect when map.put() operations overwrite existing values, indicating potential dimension loss.

### Implementation

#### Java Instrumentation

```java
package com.increff.irisx.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Utility for monitoring map overwrites that may indicate granularity issues
 */
public class GranularityMonitor {
    
    private static final Logger logger = LoggerFactory.getLogger(GranularityMonitor.class);
    
    // Track overwrites by (class, variable) pair
    private static final Map<String, AtomicInteger> overwriteCounts = new ConcurrentHashMap<>();
    private static final boolean MONITORING_ENABLED = Boolean.parseBoolean(
        System.getProperty("granularity.monitoring.enabled", "false")
    );
    
    /**
     * Monitor a map put operation for overwrites
     * 
     * @param map The map being updated
     * @param key The key being inserted
     * @param value The value being inserted
     * @param className The class performing the operation
     * @param variableName The map variable name
     * @return true if overwrite occurred
     */
    public static <K, V> boolean monitorPut(Map<K, V> map, K key, V value, 
                                             String className, String variableName) {
        if (!MONITORING_ENABLED) {
            map.put(key, value);
            return false;
        }
        
        V existingValue = map.get(key);
        boolean isOverwrite = existingValue != null && !existingValue.equals(value);
        
        if (isOverwrite) {
            String monitorKey = className + "." + variableName;
            overwriteCounts.computeIfAbsent(monitorKey, k -> new AtomicInteger(0))
                           .incrementAndGet();
            
            logger.warn("Granularity Issue: Map overwrite detected - class={}, variable={}, key={}, " +
                       "oldValue={}, newValue={}", 
                       className, variableName, key, existingValue, value);
        }
        
        map.put(key, value);
        return isOverwrite;
    }
    
    /**
     * Get overwrite statistics
     */
    public static Map<String, Integer> getOverwriteStatistics() {
        Map<String, Integer> stats = new ConcurrentHashMap<>();
        overwriteCounts.forEach((key, count) -> stats.put(key, count.get()));
        return stats;
    }
    
    /**
     * Print summary report
     */
    public static void printSummary() {
        if (overwriteCounts.isEmpty()) {
            logger.info("Granularity Monitor: No overwrites detected");
            return;
        }
        
        logger.warn("=== GRANULARITY MONITOR SUMMARY ===");
        overwriteCounts.forEach((key, count) -> {
            logger.warn("  {} - {} overwrites", key, count.get());
        });
        logger.warn("=================================");
    }
    
    /**
     * Reset monitoring statistics
     */
    public static void reset() {
        overwriteCounts.clear();
    }
}
```

### Usage Example

#### Before (without monitoring):
```java
public class ReorderingData {
    private Map<Key, CoverDaysRow> coverDaysMap = new HashMap<>();
    
    public void setCoverDaysMap(List<CoverDaysRow> rows) {
        for (CoverDaysRow row : rows) {
            coverDaysMap.put(new Key(row.getStyle()), row);
        }
    }
}
```

#### After (with monitoring):
```java
public class ReorderingData {
    private Map<Key, CoverDaysRow> coverDaysMap = new HashMap<>();
    
    public void setCoverDaysMap(List<CoverDaysRow> rows) {
        for (CoverDaysRow row : rows) {
            Key key = new Key(row.getStyle());
            GranularityMonitor.monitorPut(
                coverDaysMap, 
                key, 
                row,
                "ReorderingData",
                "coverDaysMap"
            );
        }
    }
}
```

### Enabling Monitoring

Add to application startup or JVM properties:
```bash
-Dgranularity.monitoring.enabled=true
```

Or in code:
```java
System.setProperty("granularity.monitoring.enabled", "true");
```

## Pattern 2: Multi-Value Input Detection

### Purpose
Detect when input data has multiple distinct values for dimensions that may be missing from keys.

### Implementation

```java
package com.increff.irisx.validation;

import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Validates input data granularity during loading
 */
public class GranularityValidator {
    
    private static final Logger logger = LoggerFactory.getLogger(GranularityValidator.class);
    
    /**
     * Validate that input data doesn't have multiple distinct values
     * for omitted dimensions
     * 
     * @param rows Input rows to validate
     * @param keyExtractor Function to extract reduced key
     * @param dimensionExtractor Function to extract potentially omitted dimension
     * @param dimensionName Name of the dimension for logging
     * @return Validation result
     */
    public static <T, K, D> ValidationResult validateGranularity(
            List<T> rows,
            Function<T, K> keyExtractor,
            Function<T, D> dimensionExtractor,
            String dimensionName) {
        
        Map<K, Set<D>> dimensionsByKey = new HashMap<>();
        
        for (T row : rows) {
            K key = keyExtractor.apply(row);
            D dimension = dimensionExtractor.apply(row);
            
            dimensionsByKey.computeIfAbsent(key, k -> new HashSet<>())
                          .add(dimension);
        }
        
        // Find keys with multiple dimension values
        List<K> problematicKeys = new ArrayList<>();
        for (Map.Entry<K, Set<D>> entry : dimensionsByKey.entrySet()) {
            if (entry.getValue().size() > 1) {
                problematicKeys.add(entry.getKey());
                logger.error("Granularity Issue: Key {} has multiple {} values: {}", 
                           entry.getKey(), dimensionName, entry.getValue());
            }
        }
        
        if (!problematicKeys.isEmpty()) {
            return ValidationResult.error(
                String.format("Found %d keys with multiple %s values - dimension may be missing from key structure", 
                             problematicKeys.size(), dimensionName)
            );
        }
        
        return ValidationResult.success();
    }
}
```

### Usage Example

```java
public class CoverDaysLoadApi extends AbstractLoadApi {
    
    @Override
    protected ValidationResult validate(List<CoverDaysRow> rows) {
        // Validate that style doesn't have multiple channels with different cover days
        ValidationResult channelGranularity = GranularityValidator.validateGranularity(
            rows,
            row -> row.getStyle(),                    // Reduced key (missing channel)
            row -> row.getChannel(),                  // Potentially omitted dimension
            "channel"
        );
        
        if (!channelGranularity.isSuccess()) {
            return channelGranularity;
        }
        
        return ValidationResult.success();
    }
}
```

## Pattern 3: Getter Call Monitoring

### Purpose
Monitor getter calls to detect when insufficient dimensions are provided.

### Implementation

```java
package com.increff.irisx.data;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Base class for Data classes with getter monitoring
 */
public abstract class MonitoredDataClass {
    
    private static final Logger logger = LoggerFactory.getLogger(MonitoredDataClass.class);
    private static final boolean TRACE_ENABLED = Boolean.parseBoolean(
        System.getProperty("granularity.trace.enabled", "false")
    );
    
    /**
     * Log getter call with context
     */
    protected <T> T monitoredGet(Map<?, T> map, Object key, 
                                  String getterName, Object... contexts) {
        T result = map.get(key);
        
        if (TRACE_ENABLED && result == null) {
            logger.warn("Granularity Trace: {} returned null for key={}, context={}", 
                       getterName, key, Arrays.toString(contexts));
        }
        
        return result;
    }
}
```

### Usage Example

```java
public class ReorderingData extends MonitoredDataClass {
    
    private Map<Key, CoverDaysRow> coverDaysMap;
    
    // Bad: Missing channel dimension
    public CoverDaysRow getCoverDays(int style) {
        Key key = new Key(style);
        return monitoredGet(coverDaysMap, key, "getCoverDays", "style=" + style);
    }
    
    // Good: Including all dimensions
    public CoverDaysRow getCoverDays(String channel, int style) {
        Key key = new Key(channel, style);
        return monitoredGet(coverDaysMap, key, "getCoverDays", 
                          "channel=" + channel, "style=" + style);
    }
}
```

## Pattern 4: Audit Logging for Dimension Usage

### Purpose
Create audit trail of dimension usage throughout processing pipeline.

### Implementation

```java
package com.increff.irisx.audit;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Audit dimension usage across processing pipeline
 */
public class DimensionAuditLogger {
    
    private static final Map<String, DimensionUsage> dimensionUsage = new ConcurrentHashMap<>();
    
    public static class DimensionUsage {
        private final Set<String> providedDimensions = ConcurrentHashMap.newKeySet();
        private final Set<String> usedDimensions = ConcurrentHashMap.newKeySet();
        private final Set<String> ignoredDimensions = ConcurrentHashMap.newKeySet();
        
        public void recordProvided(String dimension) {
            providedDimensions.add(dimension);
        }
        
        public void recordUsed(String dimension) {
            usedDimensions.add(dimension);
        }
        
        public Set<String> getIgnoredDimensions() {
            Set<String> ignored = new HashSet<>(providedDimensions);
            ignored.removeAll(usedDimensions);
            return ignored;
        }
    }
    
    public static DimensionUsage startAudit(String operationName) {
        DimensionUsage usage = new DimensionUsage();
        dimensionUsage.put(operationName, usage);
        return usage;
    }
    
    public static void printAuditReport() {
        System.out.println("=== DIMENSION AUDIT REPORT ===");
        dimensionUsage.forEach((operation, usage) -> {
            Set<String> ignored = usage.getIgnoredDimensions();
            if (!ignored.isEmpty()) {
                System.out.printf("WARNING: %s ignored dimensions: %s%n", 
                                operation, ignored);
            }
        });
    }
}
```

## Pattern 5: Performance Impact Tracking

### Purpose
Track performance impact of granularity mismatches (cache misses, lookups).

### Implementation

```java
package com.increff.irisx.metrics;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Track metrics related to granularity issues
 */
public class GranularityMetrics {
    
    private static final AtomicLong totalLookups = new AtomicLong(0);
    private static final AtomicLong nullReturns = new AtomicLong(0);
    private static final AtomicLong fallbackLookups = new AtomicLong(0);
    
    public static void recordLookup(boolean found, boolean wasFallback) {
        totalLookups.incrementAndGet();
        if (!found) {
            nullReturns.incrementAndGet();
        }
        if (wasFallback) {
            fallbackLookups.incrementAndGet();
        }
    }
    
    public static double getNullReturnRate() {
        long total = totalLookups.get();
        return total == 0 ? 0.0 : (double) nullReturns.get() / total;
    }
    
    public static void printMetrics() {
        System.out.println("=== GRANULARITY METRICS ===");
        System.out.printf("Total Lookups: %d%n", totalLookups.get());
        System.out.printf("Null Returns: %d (%.2f%%)%n", 
                         nullReturns.get(), getNullReturnRate() * 100);
        System.out.printf("Fallback Lookups: %d%n", fallbackLookups.get());
    }
}
```

## Integration Strategy

### Phase 1: Add Monitoring (Non-Intrusive)
1. Add GranularityMonitor utility class
2. Enable monitoring in dev/test environments only
3. Collect baseline data

### Phase 2: Add Validation
1. Add GranularityValidator to LoadAPI classes
2. Start with WARNING level
3. Escalate to ERROR based on findings

### Phase 3: Add Audit Trail
1. Instrument critical data flows
2. Generate audit reports
3. Identify ignored dimensions

### Phase 4: Production Monitoring
1. Deploy metrics collection
2. Set up alerting for high null-return rates
3. Create dashboards for tracking

## Configuration

### Environment Variables
```bash
# Enable/disable monitoring
GRANULARITY_MONITORING_ENABLED=true

# Enable trace logging
GRANULARITY_TRACE_ENABLED=true

# Set alert threshold for null return rate
GRANULARITY_NULL_RETURN_THRESHOLD=0.10

# Log overwrite details
GRANULARITY_LOG_OVERWRITES=true
```

### Spring Configuration
```java
@Configuration
public class GranularityMonitoringConfig {
    
    @Value("${granularity.monitoring.enabled:false}")
    private boolean monitoringEnabled;
    
    @PostConstruct
    public void init() {
        System.setProperty("granularity.monitoring.enabled", 
                          String.valueOf(monitoringEnabled));
    }
}
```

## Reporting and Alerts

### Log Aggregation Queries

#### Splunk Query
```spl
index=application "Granularity Issue" 
| stats count by class, variable
| where count > 10
| sort -count
```

#### ELK Query
```json
{
  "query": {
    "bool": {
      "must": [
        { "match": { "message": "Granularity Issue" } }
      ]
    }
  },
  "aggs": {
    "by_variable": {
      "terms": {
        "field": "variable.keyword",
        "size": 20
      }
    }
  }
}
```

### Alert Configuration

```yaml
alert:
  name: High Granularity Overwrites
  condition: count > 100 in 1 hour
  severity: WARNING
  actions:
    - notify: dev-team-channel
    - create: jira-ticket
    - log: audit-trail
```

## Best Practices

1. **Start in Dev/Test**: Never enable monitoring in production initially
2. **Incremental Rollout**: Monitor one module at a time
3. **Baseline First**: Collect baseline metrics before making changes
4. **Performance**: Monitoring should add < 1% overhead
5. **Clean Up**: Remove instrumentation after issues are fixed
6. **Document Findings**: Maintain log of all detected issues

## Troubleshooting

### High False Positive Rate
- Review key extraction logic
- Check for intentional overwrites (e.g., updates)
- Adjust monitoring granularity

### Performance Impact
- Disable trace logging in production
- Use sampling (monitor 1% of operations)
- Optimize logging statements

### Missing Issues
- Ensure monitoring is enabled
- Check log levels
- Verify instrumentation coverage

## Example Integration Test

```java
@Test
public void testGranularityMonitoring() {
    // Enable monitoring
    System.setProperty("granularity.monitoring.enabled", "true");
    GranularityMonitor.reset();
    
    // Load data with granularity issue
    List<CoverDaysRow> rows = Arrays.asList(
        new CoverDaysRow("Online", 1, 30),
        new CoverDaysRow("Retail", 1, 45)
    );
    
    ReorderingData data = new ReorderingData();
    data.setCoverDaysMap(rows);  // Should trigger overwrite
    
    // Verify detection
    Map<String, Integer> stats = GranularityMonitor.getOverwriteStatistics();
    assertTrue("Should detect overwrites", 
               stats.get("ReorderingData.coverDaysMap") > 0);
}
```

