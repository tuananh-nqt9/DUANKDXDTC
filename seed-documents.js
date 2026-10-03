// Script seed tài liệu mẫu
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding documents...");

  const docs = [
    {
      title: "Hồ sơ năng lực công ty",
      description: "Profile tổng quan về THANH CHƯƠNG JSC",
      icon: "FileText",
      pdfUrl: "/documents/ho-so-nang-luc.pdf",
      fileSize: "2.5 MB",
      order: 0,
      published: true,
    },
    {
      title: "Giới thiệu phòng thí nghiệm",
      description: "Thông tin chi tiết về PTN LAS-XD 795",
      icon: "FlaskConical",
      pdfUrl: "/documents/gioi-thieu-ptn.pdf",
      fileSize: "1.8 MB",
      order: 1,
      published: true,
    },
    {
      title: "Chứng chỉ & Giấy phép",
      description: "Các chứng chỉ hành nghề và công nhận",
      icon: "Award",
      pdfUrl: "/documents/chung-chi.pdf",
      fileSize: "3.2 MB",
      order: 2,
      published: true,
    },
    {
      title: "Danh mục dịch vụ",
      description: "Bảng giá và dịch vụ chi tiết",
      icon: "ClipboardList",
      pdfUrl: "/documents/danh-muc-dich-vu.pdf",
      fileSize: "1.5 MB",
      order: 3,
      published: true,
    },
  ];

  for (const doc of docs) {
    await prisma.document.create({ data: doc });
    console.log(`  ✓ Created: ${doc.title}`);
  }

  console.log("\nDone! Created", docs.length, "documents");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
