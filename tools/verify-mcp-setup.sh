#!/bin/bash

echo "🔍 Verifying MCP Setup for VIRAT"
echo "=================================="
echo ""

# Check Cursor MCP configuration
echo "1. Checking Cursor MCP Configuration..."
if [ -f "$HOME/.cursor/mcp.json" ]; then
    echo "✅ Cursor MCP config exists"

    # Check if java-mcp is configured
    if grep -q "java-mcp" "$HOME/.cursor/mcp.json"; then
        echo "✅ Java MCP server configured in Cursor"
    else
        echo "❌ Java MCP server NOT found in Cursor config"
    fi

    # Check if python-mcp is configured
    if grep -q "python-mcp" "$HOME/.cursor/mcp.json"; then
        echo "✅ Python MCP server configured in Cursor"
    else
        echo "❌ Python MCP server NOT found in Cursor config"
    fi
else
    echo "❌ Cursor MCP config NOT found at $HOME/.cursor/mcp.json"
fi

echo ""

# Check Java MCP server
echo "2. Checking Java MCP Server..."
if [ -f "/Users/aryatupkary/node-java-mcp/index.js" ]; then
    echo "✅ Java MCP server file exists"

    # Check if dependencies are installed
    if [ -d "/Users/aryatupkary/node-java-mcp/node_modules" ]; then
        echo "✅ Java MCP dependencies installed"
    else
        echo "❌ Java MCP dependencies NOT installed"
        echo "   Run: cd /Users/aryatupkary/node-java-mcp && npm install"
    fi

    # Test if server can start (quick test)
    echo "Testing Java MCP server startup..."
    timeout 3s node /Users/aryatupkary/node-java-mcp/index.js >/dev/null 2>&1
    if [ $? -eq 124 ]; then
        echo "✅ Java MCP server starts successfully"
    else
        echo "❌ Java MCP server failed to start"
    fi
else
    echo "❌ Java MCP server file NOT found"
fi

echo ""

# Check Python MCP server
echo "3. Checking Python MCP Server..."
if [ -f "/Users/aryatupkary/python-mcp/fast_python_mcp.py" ]; then
    echo "✅ Python MCP server file exists"

    # Check virtual environment
    if [ -f "/Users/aryatupkary/python-mcp/venv/bin/python" ]; then
        echo "✅ Python virtual environment exists"

        # Check if MCP package is installed
        if /Users/aryatupkary/python-mcp/venv/bin/python -c "import mcp" 2>/dev/null; then
            echo "✅ MCP package installed in virtual environment"
        else
            echo "❌ MCP package NOT installed in virtual environment"
            echo "   Run: cd /Users/aryatupkary/python-mcp && source venv/bin/activate && pip install mcp"
        fi

        # Test if server can start (quick test)
        echo "Testing Python MCP server startup..."
        timeout 3s /Users/aryatupkary/python-mcp/venv/bin/python /Users/aryatupkary/python-mcp/fast_python_mcp.py >/dev/null 2>&1
        if [ $? -eq 124 ]; then
            echo "✅ Python MCP server starts successfully"
        else
            echo "❌ Python MCP server failed to start"
        fi
    else
        echo "❌ Python virtual environment NOT found"
        echo "   Run: cd /Users/aryatupkary/python-mcp && python3 -m venv venv"
    fi
else
    echo "❌ Python MCP server file NOT found"
fi

echo ""

# Check VIRAT integration
echo "4. Checking VIRAT Integration..."
if [ -d ".bmad-virtual-intelligent-repository-analysis-transformation" ]; then
    echo "✅ VIRAT expansion pack installed"

    if [ -f ".bmad-virtual-intelligent-repository-analysis-transformation/agents/mfp-pattern-expert.md" ]; then
        echo "✅ MFP Pattern Expert added to VIRAT"

        # Check if mfp-pattern-expert is in dependencies
        if grep -q "mfp-pattern-expert.md" ".bmad-virtual-intelligent-repository-analysis-transformation/agents/virat.md"; then
            echo "✅ MFP Pattern Expert added to VIRAT dependencies"
        else
            echo "❌ MFP Pattern Expert NOT in VIRAT dependencies"
        fi
    else
        echo "❌ MFP Pattern Expert NOT found in VIRAT agents"
    fi
else
    echo "❌ VIRAT expansion pack NOT installed"
fi

echo ""
echo "🎉 MCP Setup Verification Complete!"
echo ""
echo "If any checks failed above, please run the suggested commands to fix them."
echo "Once everything is working, restart Cursor to pick up the MCP server changes."
