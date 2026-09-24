# 🏗️ THANH CHƯƠNG JSC - Website

Website chính thức của Công ty CP Xây dựng Thanh Chương - Phòng thí nghiệm LAS-XD 795.

**Stack công nghệ**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma + SQLite

---

## ⚡ CÀI ĐẶT NHANH (5 phút)

### Yêu cầu
- Node.js 18+ ([tải tại đây](https://nodejs.org))
- Git (tuỳ chọn)

### Bước 1: Cài đặt dependencies

```powershell
cd D:\Website\KDXDThanhChuong-NextJS
npm install
```

Lệnh này sẽ tự động:
- Tải về các thư viện (~150MB)
- Tạo database SQLite
- Generate Prisma Client

### Bước 2: Tạo dữ liệu mẫu (seed)

```powershell
npm run db:seed
```

Sẽ tạo:
- ✅ 1 tài khoản admin: `admin@thanhchuong.vn` / `admin123`
- ✅ 6 dịch vụ mẫu
- ✅ 4 dự án mẫu
- ✅ 3 bài viết mẫu

### Bước 3: Chạy server dev

```powershell
npm run dev
```

Mở trình duyệt: **http://localhost:3000**

---

## 🔐 TRUY CẬP ADMIN

| | |
|--|--|
| **URL admin** | http://localhost:3000/admin/login |
| **Email** | `admin@thanhchuong.vn` |
| **Mật khẩu** | `admin123` |

Sau khi đăng nhập sẽ vào Dashboard tại: http://localhost:3000/admin/dashboard

---

## 📁 CẤU TRÚC DỰ ÁN

```
KDXDThanhChuong-NextJS/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── page.tsx               # Trang chủ
│   │   ├── gioi-thieu/            # Giới thiệu
│   │   ├── dich-vu/               # Danh sách + Chi tiết dịch vụ
│   │   ├── du-an/                 # Dự án
│   │   ├── tin-tuc/               # Tin tức
│   │   ├── lien-he/               # Form liên hệ
│   │   ├── admin/                 # Admin dashboard
│   │   │   ├── login/             # Đăng nhập
│   │   │   └── (protected)/       # Cần đăng nhập
│   │   │       ├── dashboard/
│   │   │       ├── services/      # CRUD dịch vụ
│   │   │       ├── projects/      # CRUD dự án
│   │   │       ├── posts/         # CRUD tin tức
│   │   │       └── contacts/      # Quản lý liên hệ
│   │   └── api/                   # API routes
│   │       ├── auth/              # login, logout
│   │       └── contact/           # Form liên hệ
│   ├── components/                # React components
│   └── lib/                       # Utilities (prisma, auth, utils)
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Seed data
│   └── dev.db                     # SQLite database (tự tạo)
├── public/                        # Static files
├── .env                           # Environment variables
└── package.json
```

---

## 🚀 CÁC LỆNH THƯỜNG DÙNG

```powershell
# Phát triển
npm run dev              # Chạy server dev tại :3000

# Database
npm run db:push          # Đồng bộ schema -> database
npm run db:seed          # Tạo dữ liệu mẫu
npm run db:studio        # Mở Prisma Studio (xem database trên web)

# Production
npm run build            # Build cho production
npm start                # Chạy server production

# Khác
npm run lint             # Check lỗi code
```

---

## 🗄️ DATABASE (SQLite - miễn phí)

Project dùng **SQLite** để chạy local miễn phí. Khi deploy lên Vercel/Netlify, cần đổi sang **PostgreSQL** (Supabase/Neon - miễn phí).

Để xem/sửa database, dùng:
```powershell
npm run db:studio
```

→ Mở http://localhost:5555

---

## 🌐 DEPLOY LÊN INTERNET (MIỄN PHÍ)

### Option 1: Vercel + Supabase (Khuyến nghị - FREE)

**Bước 1**: Tạo tài khoản [Supabase](https://supabase.com) → Tạo PostgreSQL database → Copy connection string

**Bước 2**: Vào [Vercel](https://vercel.com) → Import Git repo → Add env vars:

```
DATABASE_URL = [Supabase connection string]
JWT_SECRET = [random string 32+ chars]
NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
```

**Bước 3**: Trong `prisma/schema.prisma`, đổi:
```prisma
datasource db {
  provider = "postgresql"    // đổi từ "sqlite"
  url      = env("DATABASE_URL")
}
```

**Bước 4**: Deploy! Tốn ~5 phút.

### Mua tên miền (tuỳ chọn)

- Tên miền `.vn`: 500k-700k/năm tại [iNET](https://inet.vn), [VNPT](https://vnpt.vn)
- Tên miền `.com`: 200k-300k/năm tại [Namecheap](https://namecheap.com)

---

## 🎨 TÍNH NĂNG ADMIN

Sau khi đăng nhập, bạn có thể:

✅ **Quản lý dịch vụ** - Thêm/sửa/xóa, bật/tắt hiển thị
✅ **Quản lý dự án** - Upload hình, đánh dấu nổi bật
✅ **Quản lý tin tức** - Viết bài với HTML
✅ **Quản lý liên hệ** - Xem tin nhắn từ khách hàng
✅ **Thống kê** - Số lượng dịch vụ, dự án, liên hệ mới

---

## 🔧 TUỲ CHỈNH

### Đổi màu chính

Sửa trong `src/app/globals.css` hoặc `tailwind.config.js`:

```javascript
colors: {
  primary: {
    600: '#your-color',  // Đổi sang màu bạn muốn
  }
}
```

### Thêm trang mới

Tạo folder mới trong `src/app/`:
```
src/app/[ten-trang]/page.tsx
```

### Thêm field vào database

Sửa `prisma/schema.prisma`:
```prisma
model Service {
  // ... existing fields
  newField String?
}
```

Sau đó:
```powershell
npm run db:push
npm run db:seed
```

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, kiểm tra:

1. **Node.js**: `node --version` phải >= 18
2. **Port 3000 bận?** Sửa `package.json` → `"dev": "next dev -p 3001"`
3. **Lỗi database**: Xoá file `prisma/dev.db` rồi chạy lại `npm run db:seed`

---

© 2026 THANH CHƯƠNG JSC
