// Script đổi mật khẩu tài khoản admin
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function changeAdminPassword() {
  try {
    const newPassword = process.argv[2] || "Tc45806";
    console.log(`🔐 Đang cập nhật mật khẩu admin thành: "${newPassword}"...`);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.updateMany({
      data: {
        password: hashedPassword,
      },
    });

    console.log(`✅ Cập nhật thành công cho ${result.count} tài khoản!`);
    
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
      },
    });

    console.log("\n📋 DANH SÁCH TÀI KHOẢN ADMIN HIỆN TẠI:");
    users.forEach((u) => {
      console.log(`   - Email: ${u.email} | Tên: ${u.name} | Quyền: ${u.role}`);
    });
    console.log(`   - Mật khẩu mới: ${newPassword}\n`);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

changeAdminPassword();
