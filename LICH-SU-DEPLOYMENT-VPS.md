# 📚 LỊCH SỬ DEPLOYMENT VPS - DỰ ÁN KDXD THANH CHƯƠNG

> **Tóm tắt từ lịch sử chat cũ - Ngày 24-25/09/2026**

---

## 🎯 THÔNG TIN VPS & HOSTING

### 📋 Chi tiết VPS (ZHOST)
```
🌐 IP VPS: 160.30.161.44
🔌 Port SSH: 8686 (KHÔNG PHẢI 22 mặc định!)
👤 Username: root
🔑 Password: ^1eTs_p1
```

### 💰 Gói dịch vụ đã mua
```
┌──────────────────────────────┬────────────┐
│ Dịch vụ                      │ Giá        │
├──────────────────────────────┼────────────┤
│ VPS Giá rẻ - 2VPS-Basic     │ 1,080,000đ │
│ Tên miền kdxdthanhchuong.vn │   450,000đ │
│ Giảm giá 20% VPS            │  -216,000đ │
├──────────────────────────────┼────────────┤
│ TỔNG CỘNG                    │ 1,314,000đ │
└──────────────────────────────┴────────────┘
```

### 🌐 Domain
```
Domain: kdxdthanhchuong.vn
Hạn: 24/09/2027
Nhà cung cấp: ZHOST
```

---

## 🚀 QUY TRÌNH DEPLOYMENT ĐÃ THỰC HIỆN

### Bước 1: Kết nối SSH từ Windows PowerShell

```powershell
# Mở PowerShell và chạy:
ssh -p 8686 root@160.30.161.44

# Lần đầu sẽ hỏi xác nhận fingerprint:
# → Gõ: yes

# Nhập password: ^1eTs_p1
# (Không hiện ký tự khi gõ - đó là bình thường!)
```

### Bước 2: Cập nhật hệ thống Ubuntu

```bash
# Update package lists
apt update

# Upgrade installed packages
apt upgrade -y
```

### Bước 3: Cài đặt Node.js

Có 2 cách đã thảo luận:

**Cách 1: Cài từ NodeSource (Khuyến nghị - phiên bản mới nhất)**
```bash
# Cài Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Kiểm tra
node -v  # Nên hiện v20.x.x
npm -v
```

**Cách 2: Dùng apt (phiên bản cũ hơn)**
```bash
apt install nodejs npm -y
```

### Bước 4: Cài đặt Git

```bash
apt install git -y

# Kiểm tra
git --version
```

### Bước 5: Clone code từ GitHub

```bash
# Di chuyển đến thư mục web root
cd /var/www

# Clone repository
git clone https://github.com/tuananh-nqt9/DUANKDXDTC.git

# Đổi tên thư mục (tùy chọn)
mv DUANKDXDTC kdxdthanhchuong

# Vào thư mục project
cd kdxdthanhchuong
```

### Bước 6: Cài đặt dependencies

```bash
npm install
```

### Bước 7: Tạo file .env trên VPS

```bash
nano .env
```

Nội dung file `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="thanhchuong-jsc-super-secret-key-change-in-production-2026"
NEXT_PUBLIC_SITE_NAME="THANH CHƯƠNG JSC"
NEXT_PUBLIC_SITE_URL="https://kdxdthanhchuong.vn"
NEXT_PUBLIC_PHONE="0939688669"
NEXT_PUBLIC_EMAIL="Thanhchuong.jsc@gmail.com"
```

Lưu file: `Ctrl+X` → `Y` → `Enter`

### Bước 8: Setup Database (Prisma)

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data
npm run db:seed
```

### Bước 9: Build Next.js

```bash
npm run build
```

### Bước 10: Cài đặt PM2 (Process Manager)

```bash
# Cài PM2 global
npm install -g pm2

# Start ứng dụng với PM2
pm2 start npm --name "kdxd-website" -- start

# Lưu cấu hình PM2
pm2 save

# Tự động khởi động khi server restart
pm2 startup
# Sau đó chạy lệnh mà PM2 gợi ý
```

### Bước 11: Cài đặt & Cấu hình Nginx

```bash
# Cài Nginx
apt install nginx -y

# Tạo file cấu hình cho website
nano /etc/nginx/sites-available/kdxdthanhchuong
```

Nội dung file Nginx config:
```nginx
server {
    listen 80;
    server_name kdxdthanhchuong.vn www.kdxdthanhchuong.vn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Lưu và kích hoạt:
```bash
# Tạo symbolic link
ln -s /etc/nginx/sites-available/kdxdthanhchuong /etc/nginx/sites-enabled/

# Kiểm tra cấu hình
nginx -t

# Restart Nginx
systemctl restart nginx

# Enable Nginx tự khởi động
systemctl enable nginx
```

### Bước 12: Cấu hình Firewall (UFW)

```bash
# Enable UFW
ufw enable

# Allow SSH (port 8686)
ufw allow 8686/tcp

# Allow HTTP
ufw allow 80/tcp

# Allow HTTPS
ufw allow 443/tcp

# Kiểm tra status
ufw status
```

### Bước 13: Cấu hình DNS

Trỏ domain về VPS tại dashboard ZHOST:
```
Type: A Record
Name: @ (hoặc kdxdthanhchuong.vn)
Value: 160.30.161.44
TTL: 3600

Type: A Record
Name: www
Value: 160.30.161.44
TTL: 3600
```

---

## ✅ KẾT QUẢ

- ✅ Website đã chạy tại: `http://kdxdthanhchuong.vn`
- ✅ PM2 quản lý process tự động
- ✅ Nginx làm reverse proxy
- ✅ Firewall đã được cấu hình
- ✅ Domain đã trỏ về VPS

---

## 🔄 CẬP NHẬT CODE SAU NÀY

Khi có thay đổi code trên máy local:

```powershell
# 1. Trên máy Windows - Push code lên GitHub
git add .
git commit -m "Update features"
git push origin main

# 2. SSH vào VPS
ssh -p 8686 root@160.30.161.44

# 3. Pull code mới
cd /var/www/kdxdthanhchuong
git pull origin main

# 4. Cài dependencies mới (nếu có)
npm install

# 5. Rebuild
npm run build

# 6. Restart PM2
pm2 restart kdxd-website

# 7. Xong!
```

---

## 🆘 CÁC LỆNH HỮU ÍCH

### Quản lý PM2
```bash
pm2 list                    # Xem danh sách process
pm2 logs kdxd-website       # Xem logs
pm2 restart kdxd-website    # Restart app
pm2 stop kdxd-website       # Stop app
pm2 start kdxd-website      # Start app
pm2 delete kdxd-website     # Xóa app khỏi PM2
pm2 monit                   # Monitor real-time
```

### Quản lý Nginx
```bash
systemctl status nginx      # Kiểm tra status
systemctl restart nginx     # Restart Nginx
systemctl stop nginx        # Stop Nginx
systemctl start nginx       # Start Nginx
nginx -t                    # Test cấu hình
```

### Kiểm tra Logs
```bash
pm2 logs                    # Logs ứng dụng
tail -f /var/log/nginx/access.log   # Nginx access log
tail -f /var/log/nginx/error.log    # Nginx error log
```

### Quản lý Database
```bash
npx prisma studio           # Mở Prisma Studio (GUI)
npx prisma db push          # Apply schema changes
npm run db:seed             # Seed lại data
```

---

## 📝 GHI CHÚ QUAN TRỌNG

1. **SSH Port**: 8686 (không phải 22 mặc định)
2. **Next.js chạy trên port**: 3000 (local)
3. **Nginx listen**: Port 80 và proxy đến 3000
4. **Database**: SQLite (file: `./dev.db`)
5. **Admin account**: 
   - Email: `kdxdthanhchuong@gmail.com`
   - Password: `admin@888`

---

## 🔐 BẢO MẬT

Các điểm cần lưu ý về bảo mật:
- ✅ SSH không dùng port 22 mặc định
- ⚠️ Chưa cài SSL/HTTPS (cần cài Let's Encrypt)
- ⚠️ Password SSH nên đổi định kỳ
- ⚠️ Nên dùng SSH Key thay vì password
- ⚠️ JWT_SECRET nên đổi trong production

---

**Tài liệu này được tạo từ lịch sử chat deployment VPS ngày 24-25/09/2026**
