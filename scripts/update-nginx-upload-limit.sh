#!/bin/bash
# ==============================================================================
# SCRIPT CẬP NHẬT GIỚI HẠN UPLOAD NGINX (client_max_body_size 64M) TRÊN VPS
# Website: kdxdthanhchuong.vn
# ==============================================================================

set -e

NGINX_CONF="/etc/nginx/sites-available/kdxdthanhchuong"
if [ ! -f "$NGINX_CONF" ]; then
    NGINX_CONF="/etc/nginx/conf.d/kdxdthanhchuong.conf"
fi
if [ ! -f "$NGINX_CONF" ]; then
    NGINX_CONF="/etc/nginx/nginx.conf"
fi

echo "=========================================================="
echo "  BẮT ĐẦU CẤU HÌNH client_max_body_size 64M CHO NGINX"
echo "  File cấu hình phát hiện: $NGINX_CONF"
echo "=========================================================="

# 1. Sao lưu cấu hình cũ
BACKUP_FILE="${NGINX_CONF}.bak_$(date +%Y%m%d_%H%M%S)"
echo "1. Đang sao lưu cấu hình Nginx sang: $BACKUP_FILE"
cp "$NGINX_CONF" "$BACKUP_FILE"

# 2. Kiểm tra nếu client_max_body_size đã tồn tại thì cập nhật, nếu chưa thì thêm vào
if grep -q "client_max_body_size" "$NGINX_CONF"; then
    echo "2. Đang cập nhật giá trị client_max_body_size thành 64M..."
    sed -i -E 's/client_max_body_size[[:space:]]+[0-9]+[a-zA-Z]*;/client_max_body_size 64M;/g' "$NGINX_CONF"
else
    echo "2. Đang chèn client_max_body_size 64M vào khối server..."
    # Chèn ngay sau dòng server_name
    sed -i '/server_name/a \    client_max_body_size 64M;\n    proxy_read_timeout 300s;\n    proxy_connect_timeout 300s;\n    proxy_send_timeout 300s;' "$NGINX_CONF"
fi

# 3. Kiểm tra cú pháp Nginx
echo "3. Đang kiểm tra tính hợp lệ của cấu hình (nginx -t)..."
if nginx -t; then
    echo "✓ Cấu hình Nginx hoàn toàn hợp lệ!"
else
    echo "❌ Lỗi cú pháp Nginx! Đang khôi phục file sao lưu..."
    cp "$BACKUP_FILE" "$NGINX_CONF"
    exit 1
fi

# 4. Reload Nginx
echo "4. Đang nạp lại cấu hình Nginx (systemctl reload nginx)..."
systemctl reload nginx

echo "=========================================================="
echo "✓ HOÀN TẤT CẤU HÌNH NGINX THÀNH CÔNG!"
echo "Giờ đây bạn có thể upload file PDF tới 50MB mà không bị lỗi 413."
echo "=========================================================="
