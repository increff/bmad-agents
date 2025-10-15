#!/bin/bash

# BMAD Notion Integration - Installation Script
echo "🚀 Installing BMAD Notion Integration dependencies..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📋 Creating .env file from template..."
    if [ -f "env.example" ]; then
        cp env.example .env
        echo "✅ .env file created from env.example"
        echo "⚠️  Please edit .env file with your Notion API credentials"
    else
        echo "❌ env.example file not found"
        exit 1
    fi
else
    echo "✅ .env file already exists"
fi

# Make all scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/*.js

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your Notion API credentials"
echo "2. Test the connection: npm run test"
echo "3. Use the commands:"
echo "   - npm run fetch REQ-994"
echo "   - npm run implement REQ-994"
echo "   - npm run push"
echo "   - npm run status"
echo "   - npm run list"
echo "   - npm run config"
echo "   - npm run help"
echo ""
echo "Or use the interactive mode:"
echo "   - npm run interactive"
echo ""
