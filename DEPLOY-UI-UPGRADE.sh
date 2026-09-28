#!/bin/bash

# ===========================================
# 🚀 DEPLOY UI UPGRADE LÊN VPS
# ===========================================

echo "════════════════════════════════════════════"
echo "🚀 DEPLOY NÂNG CẤP GIAO DIỆN"
echo "════════════════════════════════════════════"
echo ""

cd /var/www/DUANKDXDTC

# 1. Pull code mới từ GitHub
echo "📥 1. Pulling latest code from GitHub..."
git pull origin main

# 2. Install dependencies (nếu có thay đổi)
echo ""
echo "📦 2. Installing dependencies..."
npm install --production=false

# 3. Build lại với memory optimization
echo ""
echo "🏗️  3. Building Next.js application..."
rm -rf .next
NODE_OPTIONS="--max-old-space-size=2048" npm run build

# 4. Restart PM2
echo ""
echo "🔄 4. Restarting PM2..."
pm2 restart kdxd

# 5. Đợi server khởi động
echo ""
echo "⏳ 5. Waiting for server to start..."
sleep 8

# 6. Kiểm tra status
echo ""
echo "✅ 6. Checking PM2 status..."
pm2 list

echo ""
echo "📋 7. Recent logs..."
pm2 logs kdxd --lines 20 --nostream

echo ""
echo "════════════════════════════════════════════"
echo "✅ DEPLOYMENT HOÀN TẤT!"
echo "════════════════════════════════════════════"
echo ""
echo "🌐 Truy cập: https://kdxdthanhchuong.vn"
echo ""
echo "🔍 Kiểm tra thêm logs:"
echo "   pm2 logs kdxd"
echo ""
echo "🔄 Restart nếu cần:"
echo "   pm2 restart kdxd"
echo "════════════════════════════════════════════"
