# 📋 HƯỚNG DẪN DEPLOY TÍNH NĂNG PDF

## ✅ Đã hoàn thành (Local)
- ✅ Thêm field `pdfUrl` vào model TestCategory
- ✅ Tạo migration database
- ✅ Cập nhật trang admin để nhập link PDF
- ✅ Hiển thị PDF viewer trên trang chi tiết
- ✅ Push code lên GitHub

---

## 🚀 BƯỚC 1: Pull code mới trên server

SSH vào server và chạy:

```bash
cd /var/www/DUANKDXDTC

# Backup .env
cp .env .env.backup

# Stash local changes (nếu có)
git stash

# Pull code mới
git pull origin main

# Restore .env
mv .env.backup .env

# Chạy migration
npx prisma migrate deploy

# Rebuild
npm run build

# Restart PM2
pm2 list
pm2 restart kdxd  # Hoặc pm2 restart all

echo ""
echo "✅ Deploy code thành công!"
```

---

## 🚀 BƯỚC 2: Upload file PDF lên server

Có 2 cách:

### Cách 1: Upload qua SSH (SCP)
Từ máy local:

```powershell
# Upload 1 file
scp "D:\path\to\file.pdf" root@103.173.228.174:/var/www/DUANKDXDTC/public/documents/

# Upload nhiều file
scp "D:\Documents\*.pdf" root@103.173.228.174:/var/www/DUANKDXDTC/public/documents/
```

### Cách 2: Upload qua FTP/SFTP
- Host: `103.173.228.174`
- Port: `22`
- User: `root`
- Path: `/var/www/DUANKDXDTC/public/documents/`

---

## 🚀 BƯỚC 3: Cập nhật link PDF trong admin

1. Truy cập: https://kdxdthanhchuong.vn/admin/login
2. Đăng nhập với tài khoản admin
3. Vào **"Danh mục phép thử"**
4. Tạo mới hoặc edit danh mục
5. Điền link PDF: `/documents/ten-file.pdf`
6. Lưu lại

---

## 📝 VÍ DỤ LINK PDF

Giả sử upload file: `thi-nghiem-be-tong.pdf` vào `/var/www/DUANKDXDTC/public/documents/`

Thì trong admin điền:
```
/documents/thi-nghiem-be-tong.pdf
```

Khi xem trên web sẽ là:
```
https://kdxdthanhchuong.vn/documents/thi-nghiem-be-tong.pdf
```

---

## ✅ KIỂM TRA

Sau khi deploy xong:

1. **Trang danh mục:** https://kdxdthanhchuong.vn/chi-tieu-phep-thu
   - Xem cột "PDF" có icon ✅ hay ❌

2. **Trang chi tiết:** https://kdxdthanhchuong.vn/chi-tieu-phep-thu/thi-nghiem-be-tong
   - Nếu có PDF sẽ hiển thị PDF viewer ở trên
   - Nút "Tải xuống PDF" để download

---

## 🎯 TÍNH NĂNG MỚI

### 1. Admin Panel
- ✅ Thêm trường "Link file PDF" khi tạo/sửa danh mục
- ✅ Hiển thị trạng thái PDF (có/chưa có) trong danh sách
- ✅ Link trực tiếp để xem PDF

### 2. Frontend
- ✅ PDF viewer nhúng trực tiếp trong trang (800px cao)
- ✅ Nút download PDF
- ✅ Responsive trên mobile
- ✅ Chỉ hiển thị khi có PDF

### 3. Database
- ✅ Thêm field `pdfUrl` (nullable) vào bảng `TestCategory`
- ✅ Migration đã chạy sẵn

---

## 🔧 TROUBLESHOOTING

### Lỗi: PDF không hiển thị
**Nguyên nhân:** File chưa upload hoặc đường dẫn sai

**Giải pháp:**
```bash
# Kiểm tra file có tồn tại không
ls -la /var/www/DUANKDXDTC/public/documents/

# Kiểm tra quyền
chmod 644 /var/www/DUANKDXDTC/public/documents/*.pdf
```

### Lỗi: Migration failed
**Nguyên nhân:** Database chưa cập nhật

**Giải pháp:**
```bash
cd /var/www/DUANKDXDTC
npx prisma migrate deploy
npx prisma generate
```

### Lỗi: PM2 not found
**Nguyên nhân:** Process name sai

**Giải pháp:**
```bash
# Xem danh sách process
pm2 list

# Restart đúng tên
pm2 restart <tên-process>

# Hoặc restart tất cả
pm2 restart all
```

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, liên hệ developer hoặc kiểm tra:
- Git log: `git log --oneline -5`
- PM2 logs: `pm2 logs`
- Build logs: `npm run build`

**Commit này:** `efcdd93` - "feat: add PDF upload feature for test categories"
