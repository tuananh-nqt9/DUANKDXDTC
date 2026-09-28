#!/bin/bash
# Script deploy tính năng PDF cho test categories
# Chạy trên server: bash deploy-pdf.sh

set -e  # Exit on error

echo "🚀 Bắt đầu deploy tính năng PDF..."
echo ""

# Bước 1: Backup và pull code
echo "📥 Bước 1: Pull code mới từ GitHub..."
cd /var/www/DUANKDXDTC

if [ -f .env ]; then
    cp .env .env.backup
    echo "✅ Đã backup .env"
fi

if git diff-index --quiet HEAD --; then
    echo "✅ Working tree clean"
else
    echo "⚠️ Có local changes, đang stash..."
    git stash
fi

git pull origin main
echo "✅ Pull code thành công"

if [ -f .env.backup ]; then
    mv .env.backup .env
    echo "✅ Restore .env"
fi

echo ""

# Bước 2: Chạy migration
echo "🗄️ Bước 2: Chạy migration database..."
npx prisma migrate deploy
npx prisma generate
echo "✅ Migration hoàn tất"
echo ""

# Bước 3: Tạo thư mục documents
echo "📁 Bước 3: Tạo thư mục documents..."
mkdir -p public/documents
chmod 755 public/documents
echo "✅ Thư mục documents đã sẵn sàng"
echo ""

# Bước 4: Build
echo "🔨 Bước 4: Build production..."
npm run build
echo "✅ Build thành công"
echo ""

# Bước 5: Restart PM2
echo "♻️ Bước 5: Restart PM2..."
pm2 list
if pm2 describe kdxd > /dev/null 2>&1; then
    pm2 restart kdxd
    echo "✅ Đã restart process 'kdxd'"
else
    echo "⚠️ Process 'kdxd' không tồn tại, restart all..."
    pm2 restart all
fi

pm2 save
echo "✅ PM2 config đã lưu"
echo ""

# Hoàn tất
echo "════════════════════════════════════════════"
echo "🎉 DEPLOY HOÀN TẤT!"
echo "════════════════════════════════════════════"
echo ""
echo "📋 KIỂM TRA:"
echo "   • Admin: https://kdxdthanhchuong.vn/admin/test-categories"
echo "   • Frontend: https://kdxdthanhchuong.vn/chi-tieu-phep-thu"
echo ""
echo "📤 UPLOAD PDF:"
echo "   • Thư mục: /var/www/DUANKDXDTC/public/documents/"
echo "   • Link format: /documents/ten-file.pdf"
echo ""
echo "🔍 DEBUG (nếu cần):"
echo "   • pm2 logs kdxd"
echo "   • pm2 status"
echo "   • ls -la public/documents/"
echo ""
