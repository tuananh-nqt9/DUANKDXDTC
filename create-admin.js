// Script tạo tài khoản admin mới
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log("🔐 Đang tạo tài khoản admin mới...");

    const email = "kdxdthanhchuong@gmail.com";
    const password = "admin@888";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Xóa admin cũ nếu có
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ["admin@thanhchuong.vn", "kdxdthanhchuong@gmail.com"],
        },
      },
    });

    // Tạo admin mới
    const admin = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: "Administrator",
        role: "admin",
      },
    });

    console.log("✅ Tạo tài khoản admin thành công!");
    console.log("");
    console.log("📋 THÔNG TIN ĐĂNG NHẬP:");
    console.log("   URL:      https://kdxdthanhchuong.vn/admin/login");
    console.log("   Email:    " + admin.email);
    console.log("   Password: admin@888");
    console.log("");
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
