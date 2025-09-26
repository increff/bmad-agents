# Analyze Performance Bottlenecks

## Purpose
Identify and analyze performance bottlenecks in Java algorithms, particularly in retail analytics and business intelligence systems.

## Prerequisites
- Access to the algorithm code
- Performance metrics or symptoms
- Understanding of the expected performance baseline

## Workflow

### Step 1: Performance Problem Definition
**elicit: true**
**format: structured**

Please provide the following performance information:

1. **Performance Issue**: What specific performance problem are you experiencing?
2. **Current Metrics**: What are the current performance measurements (execution time, memory usage, etc.)?
3. **Expected Performance**: What should the performance be?
4. **Input Scale**: What is the size/scale of input data?
5. **Environment**: What is the runtime environment (JVM version, memory allocation, etc.)?
6. **When It Occurs**: Does this happen consistently or under specific conditions?
7. **Impact**: How does this affect the overall system performance?

### Step 2: Algorithm Analysis
**elicit: false**

I will analyze the algorithm for performance issues:

1. **Time Complexity Analysis**
   - Identify O(n), O(n²), O(log n) operations
   - Look for nested loops and recursive calls
   - Analyze data structure operations

2. **Space Complexity Analysis**
   - Memory allocation patterns
   - Object creation frequency
   - Data structure memory usage

3. **I/O Operations**
   - Database query efficiency
   - File I/O operations
   - Network calls and external API usage

4. **Concurrency Issues**
   - Thread synchronization problems
   - Deadlock potential
   - Resource contention

### Step 3: Profiling Strategy
**elicit: false**

I will provide a comprehensive profiling approach:

1. **JVM Profiling Tools**
   - JProfiler, VisualVM, or JConsole setup
   - Key metrics to monitor
   - Profiling configuration

2. **Code Instrumentation**
   - Strategic logging points
   - Performance measurement code
   - Timing and memory tracking

3. **Load Testing**
   - Test scenarios to simulate
   - Performance baseline establishment
   - Stress testing approach

### Step 4: Bottleneck Identification
**elicit: false**

Based on analysis, I will identify:

1. **CPU Bottlenecks**
   - Expensive computations
   - Inefficient algorithms
   - Unnecessary processing

2. **Memory Bottlenecks**
   - Memory leaks
   - Excessive object creation
   - Large data structure usage

3. **I/O Bottlenecks**
   - Slow database queries
   - Inefficient file operations
   - Network latency issues

4. **Concurrency Bottlenecks**
   - Thread contention
   - Synchronization overhead
   - Resource locking issues

### Step 5: Optimization Recommendations
**elicit: false**

I will provide specific optimization strategies:

1. **Algorithm Optimizations**
   - More efficient algorithms
   - Data structure improvements
   - Caching strategies

2. **Code Optimizations**
   - Loop optimizations
   - Object reuse patterns
   - Lazy loading implementations

3. **Database Optimizations**
   - Query optimization
   - Indexing strategies
   - Connection pooling

4. **JVM Tuning**
   - Memory allocation settings
   - Garbage collection tuning
   - JIT compiler optimizations

## Output Format

The performance analysis will be structured as:

```markdown
# Performance Analysis Report: [Algorithm Name]

## Performance Summary
[Current performance metrics and issues]

## Bottleneck Analysis
[Detailed analysis of performance bottlenecks]

## Profiling Results
[Key findings from performance profiling]

## Optimization Recommendations
[Specific improvements to implement]

## Implementation Plan
[Step-by-step optimization approach]

## Expected Performance Gains
[Projected performance improvements]

## Monitoring Strategy
[How to track performance improvements]
```

## Success Criteria
- Performance bottlenecks are clearly identified
- Root causes are determined
- Specific optimization strategies are provided
- Implementation plan is actionable
- Performance monitoring approach is defined
