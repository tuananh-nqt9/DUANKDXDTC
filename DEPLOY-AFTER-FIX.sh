#!/bin/bash

echo "════════════════════════════════════════════"
echo "🚀 DEPLOY SAU KHI FIX CSS"
echo "════════════════════════════════════════════"
echo ""

cd /var/www/DUANKDXDTC

# Stop PM2 để tránh restart loop
echo "⏸️  1. Stopping PM2..."
pm2 stop kdxd

# Pull code đã fix
echo ""
echo "📥 2. Pulling fixed code..."
git pull origin main

# Xóa cache cũ
echo ""
echo "🗑️  3. Cleaning cache..."
rm -rf .next
rm -rf node_modules/.cache

# Build lại
echo ""
echo "🏗️  4. Building (2-3 phút)..."
NODE_OPTIONS="--max-old-space-size=3072" npm run build

# Kiểm tra BUILD_ID
echo ""
echo "🔍 5. Verifying BUILD_ID..."
if [ -f .next/BUILD_ID ]; then
    echo "✅ BUILD_ID found:"
    cat .next/BUILD_ID
    echo ""
else
    echo "❌ BUILD_ID not created! Build failed!"
    echo "Check build logs above for errors."
    exit 1
fi

# Start PM2
echo ""
echo "🚀 6. Starting PM2..."
pm2 start kdxd

# Đợi server khởi động
echo ""
echo "⏳ 7. Waiting for server (10s)..."
sleep 10

# Kiểm tra status
echo ""
echo "📊 8. PM2 Status..."
pm2 list

# Xem logs
echo ""
echo "📋 9. Recent logs..."
pm2 logs kdxd --lines 30 --nostream

echo ""
echo "════════════════════════════════════════════"
echo "✅ DEPLOYMENT HOÀN TẤT!"
echo "════════════════════════════════════════════"
echo ""
echo "🌐 Website: https://kdxdthanhchuong.vn"
echo ""
echo "🔍 Xem logs real-time:"
echo "   pm2 logs kdxd --lines 100"
echo ""
echo "🔄 Nếu cần restart:"
echo "   pm2 restart kdxd"
echo ""
echo "📊 Monitor:"
echo "   pm2 monit"
echo "════════════════════════════════════════════"
