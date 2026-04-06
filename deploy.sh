#!/bin/bash
set -e

echo "→ Pulling latest..."
git pull origin main

echo "→ Installing deps..."
npm install

echo "→ Building..."
npm run build

echo "→ Restarting PM2..."
pm2 restart showrunner

echo "✅ Deployed!"
