#!/bin/bash

echo "════════════════════════════════════════════"
echo "🔧 FIX BUILD ERROR - REBUILD .next"
echo "════════════════════════════════════════════"
echo ""

# Stop PM2 trước để tránh conflict
echo "⏸️  1. Stopping PM2..."
pm2 stop kdxd

# Xóa thư mục .next và node_modules cũ
echo ""
echo "🗑️  2. Cleaning old build..."
rm -rf .next
rm -rf node_modules/.cache

# Reinstall dependencies
echo ""
echo "📦 3. Reinstalling dependencies..."
npm ci --production=false

# Build lại với memory cao hơn
echo ""
echo "🏗️  4. Building Next.js (có thể mất 2-3 phút)..."
NODE_OPTIONS="--max-old-space-size=3072" npm run build

# Kiểm tra BUILD_ID có tạo ra không
echo ""
echo "🔍 5. Checking BUILD_ID..."
if [ -f .next/BUILD_ID ]; then
    echo "✅ BUILD_ID created successfully!"
    cat .next/BUILD_ID
else
    echo "❌ BUILD_ID not found! Build failed!"
    exit 1
fi

# Start PM2 lại
echo ""
echo "🚀 6. Starting PM2..."
pm2 start kdxd

# Đợi server khởi động
echo ""
echo "⏳ 7. Waiting for server..."
sleep 10

# Kiểm tra status
echo ""
echo "📊 8. PM2 Status..."
pm2 list

echo ""
echo "📋 9. Recent logs (20 lines)..."
pm2 logs kdxd --lines 20 --nostream

echo ""
echo "════════════════════════════════════════════"
echo "✅ FIX HOÀN TẤT!"
echo "════════════════════════════════════════════"
echo ""
echo "🌐 Truy cập: https://kdxdthanhchuong.vn"
echo ""
echo "🔍 Xem logs real-time:"
echo "   pm2 logs kdxd"
echo ""
echo "🔄 Nếu vẫn lỗi, chạy:"
echo "   pm2 restart kdxd --update-env"
echo "════════════════════════════════════════════"
