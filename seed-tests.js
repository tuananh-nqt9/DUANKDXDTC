const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedTests() {
  console.log("🌱 Seeding test categories and tests...");

  const categories = [
    {
      title: "Thí nghiệm đất",
      slug: "thi-nghiem-dat",
      icon: "mountain",
      description: "Các phép thử kiểm tra tính chất cơ lý của đất nền",
      order: 1,
      tests: [
        { name: "Độ ẩm tự nhiên", standard: "TCVN 4196:1995", order: 1 },
        { name: "Khối lượng riêng", standard: "TCVN 4199:1995", order: 2 },
        { name: "Khối lượng thể tích", standard: "TCVN 4202:1995", order: 3 },
        { name: "Độ rỗng", standard: "TCVN 4197:1995", order: 4 },
        { name: "Giới hạn chảy", standard: "TCVN 4197:1995", order: 5 },
        { name: "Giới hạn dẻo", standard: "TCVN 4197:1995", order: 6 },
        { name: "Chỉ số dẻo", standard: "TCVN 4197:1995", order: 7 },
        { name: "Sức chịu nén (CBR)", standard: "TCVN 8820:2011", order: 8 },
        { name: "Độ chặt", standard: "TCVN 4201:1995", order: 9 },
        { name: "Phân tích cấp phối hạt", standard: "TCVN 4198:1995", order: 10 },
      ],
    },
    {
      title: "Thí nghiệm bê tông",
      slug: "thi-nghiem-be-tong",
      icon: "flask-conical",
      description: "Kiểm tra chất lượng bê tông tươi và bê tông cứng",
      order: 2,
      tests: [
        { name: "Độ sụt (Slump test)", standard: "TCVN 3106:1993", order: 1 },
        { name: "Cường độ nén", standard: "TCVN 3118:1993", order: 2 },
        { name: "Cường độ kéo khi uốn", standard: "TCVN 3119:1993", order: 3 },
        { name: "Độ hút nước", standard: "TCVN 3113:1993", order: 4 },
        { name: "Khối lượng thể tích", standard: "TCVN 3115:1993", order: 5 },
        { name: "Độ rỗng", standard: "TCVN 3114:1993", order: 6 },
        { name: "Cường độ bám dính", standard: "TCVN 6028:2007", order: 7 },
        { name: "Độ thấm nước", standard: "TCVN 3121:1993", order: 8 },
      ],
    },
    {
      title: "Thí nghiệm xi măng",
      slug: "thi-nghiem-xi-mang",
      icon: "beaker",
      description: "Kiểm tra chất lượng xi măng theo tiêu chuẩn Việt Nam",
      order: 3,
      tests: [
        { name: "Độ mịn - Sàng 0,09mm", standard: "TCVN 4030:2003", order: 1 },
        { name: "Thể tích ổn định", standard: "TCVN 4031:2003", order: 2 },
        { name: "Thời gian đông kết", standard: "TCVN 4032:2003", order: 3 },
        { name: "Cường độ nén", standard: "TCVN 4032:2003", order: 4 },
        { name: "Cường độ kéo uốn", standard: "TCVN 4032:2003", order: 5 },
        { name: "Hàm lượng SO3", standard: "TCVN 6016:1995", order: 6 },
      ],
    },
    {
      title: "Thí nghiệm cốt thép",
      slug: "thi-nghiem-cot-thep",
      icon: "wrench",
      description: "Kiểm tra cơ tính và chất lượng thép xây dựng",
      order: 4,
      tests: [
        { name: "Thử kéo thép", standard: "TCVN 1651:2008", order: 1 },
        { name: "Thử uốn thép", standard: "TCVN 1651:2008", order: 2 },
        { name: "Đo đường kính", standard: "TCVN 1651:2008", order: 3 },
        { name: "Giới hạn chảy", standard: "TCVN 1651:2008", order: 4 },
        { name: "Độ bền kéo", standard: "TCVN 1651:2008", order: 5 },
      ],
    },
    {
      title: "Thí nghiệm cát",
      slug: "thi-nghiem-cat",
      icon: "layers",
      description: "Kiểm tra cát xây dựng theo tiêu chuẩn",
      order: 5,
      tests: [
        { name: "Thành phần hạt (sàng)", standard: "TCVN 7572-2:2006", order: 1 },
        { name: "Hàm lượng bụi bẩn", standard: "TCVN 7572-8:2006", order: 2 },
        { name: "Hàm lượng sét", standard: "TCVN 7572-3:2006", order: 3 },
        { name: "Khối lượng riêng", standard: "TCVN 7572-4:2006", order: 4 },
        { name: "Độ rỗng", standard: "TCVN 7572-5:2006", order: 5 },
        { name: "Mô đun độ lớn", standard: "TCVN 7572-2:2006", order: 6 },
      ],
    },
    {
      title: "Thí nghiệm đá",
      slug: "thi-nghiem-da",
      icon: "box",
      description: "Kiểm tra cường độ đá dùng trong xây dựng",
      order: 6,
      tests: [
        { name: "Cường độ nén", standard: "TCVN 7572-10:2006", order: 1 },
        { name: "Độ mài mòn Los Angeles", standard: "TCVN 7572-12:2006", order: 2 },
        { name: "Khối lượng riêng", standard: "TCVN 7572-4:2006", order: 3 },
        { name: "Thành phần hạt", standard: "TCVN 7572-2:2006", order: 4 },
        { name: "Độ bền va đập", standard: "TCVN 7572-13:2006", order: 5 },
      ],
    },
    {
      title: "Thí nghiệm nền móng",
      slug: "thi-nghiem-nen-mong",
      icon: "mountain-snow",
      description: "Kiểm tra sức chịu tải và ổn định nền móng",
      order: 7,
      tests: [
        { name: "Nén tĩnh cọc (PDA)", standard: "TCVN 9393:2012", order: 1 },
        { name: "Nén tĩnh nền đất", standard: "TCVN 9362:2012", order: 2 },
        { name: "Siêu âm cọc", standard: "TCVN 9396:2012", order: 3 },
        { name: "Xuyên động SPT", standard: "TCVN 9354:2012", order: 4 },
      ],
    },
    {
      title: "Kiểm định công trình",
      slug: "kiem-dinh-cong-trinh",
      icon: "clipboard-check",
      description: "Đánh giá chất lượng công trình xây dựng",
      order: 8,
      tests: [
        { name: "Siêu âm bê tông", standard: "TCVN 9356:2012", order: 1 },
        { name: "Khoan lấy mẫu bê tông", standard: "TCVN 3118:1993", order: 2 },
        { name: "Đo độ cứng bê tông (Búa rebound)", standard: "TCVN 9334:2012", order: 3 },
        { name: "Phát hiện cốt thép", standard: "TCVN 9357:2012", order: 4 },
      ],
    },
  ];

  for (const cat of categories) {
    const { tests, ...catData } = cat;
    
    // Tạo hoặc cập nhật category
    const category = await prisma.testCategory.upsert({
      where: { slug: catData.slug },
      update: catData,
      create: catData,
    });

    // Xóa test cũ của category này
    await prisma.test.deleteMany({
      where: { categoryId: category.id },
    });

    // Tạo tests mới
    for (const test of tests) {
      await prisma.test.create({
        data: {
          ...test,
          categoryId: category.id,
        },
      });
    }
    
    console.log(`✅ ${cat.title} (${tests.length} phép thử)`);
  }

  console.log("");
  console.log("🎉 Seed hoàn tất!");
  console.log(`📊 Tổng cộng: ${categories.length} danh mục, ${categories.reduce((sum, c) => sum + c.tests.length, 0)} phép thử`);
}

seedTests()
  .catch((e) => {
    console.error("❌ Lỗi:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
