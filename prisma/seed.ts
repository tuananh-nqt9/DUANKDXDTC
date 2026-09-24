// Seed data - Dữ liệu mẫu ban đầu
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu...");

  // 1. Tạo Admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@thanhchuong.vn" },
    update: {},
    create: {
      email: "admin@thanhchuong.vn",
      password: hashedPassword,
      name: "Administrator",
      role: "admin",
    },
  });
  console.log("✅ Đã tạo admin:", admin.email);

  // 2. Tạo Services
  const services = [
    {
      slug: "thi-nghiem-vat-lieu",
      title: "Thí nghiệm Vật liệu Xây dựng",
      icon: "FlaskConical",
      excerpt: "Kiểm tra chất lượng vật liệu xi măng, cát, đá, bê tông, thép theo tiêu chuẩn Việt Nam và quốc tế.",
      content: "<p>Phòng thí nghiệm LAS-XD 795 của chúng tôi cung cấp đầy đủ các thí nghiệm kiểm tra chất lượng vật liệu xây dựng với thiết bị hiện đại, đạt chuẩn.</p>",
      order: 1,
    },
    {
      slug: "kiem-dinh-chat-luong",
      title: "Kiểm định Chất lượng Công trình",
      icon: "ClipboardCheck",
      excerpt: "Kiểm định, đánh giá chất lượng công trình xây dựng dân dụng, công nghiệp, giao thông theo quy chuẩn.",
      content: "<p>Chúng tôi cung cấp dịch vụ kiểm định chất lượng công trình xây dựng với đội ngũ kỹ sư có chứng chỉ hành nghề.</p>",
      order: 2,
    },
    {
      slug: "thi-nghiem-nen-mong",
      title: "Thí nghiệm Nền móng",
      icon: "Mountain",
      excerpt: "Thí nghiệm nén tĩnh cọc, sức chịu tải, độ chặt của đất, độ ổn định nền móng công trình.",
      content: "<p>Thí nghiệm nền móng giúp đánh giá chính xác sức chịu tải và độ ổn định của nền đất phục vụ thiết kế móng công trình.</p>",
      order: 3,
    },
    {
      slug: "tu-van-giam-sat",
      title: "Tư vấn Giám sát Thi công",
      icon: "HardHat",
      excerpt: "Giám sát thi công xây dựng công trình, đảm bảo chất lượng và tiến độ dự án.",
      content: "<p>Đội ngũ tư vấn giám sát của Thanh Chương có nhiều năm kinh nghiệm làm việc với các dự án lớn.</p>",
      order: 4,
    },
    {
      slug: "quan-trac-cong-trinh",
      title: "Quan trắc Công trình",
      icon: "Activity",
      excerpt: "Quan trắc chuyển vị, biến dạng, lún của công trình và các công trình lân cận trong quá trình thi công và sử dụng.",
      content: "<p>Dịch vụ quan trắc công trình giúp theo dõi liên tục các chỉ tiêu kỹ thuật của công trình.</p>",
      order: 5,
    },
    {
      slug: "khao-sat-dia-chat",
      title: "Khảo sát Địa chất Công trình",
      icon: "MountainSnow",
      excerpt: "Khảo sát địa chất, địa hình phục vụ thiết kế nền móng công trình xây dựng.",
      content: "<p>Khảo sát địa chất công trình là bước quan trọng đầu tiên cho mọi dự án xây dựng.</p>",
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✅ Đã tạo ${services.length} dịch vụ`);

  // 3. Tạo Projects
  const projects = [
    {
      slug: "trung-tam-thuong-mai-ha-noi",
      title: "Trung tâm thương mại Hà Nội",
      client: "Tập đoàn ABC",
      location: "Hà Nội",
      year: 2023,
      category: "Dân dụng",
      excerpt: "Kiểm định chất lượng bê tông và cốt thép cho công trình trung tâm thương mại 25 tầng.",
      content: "<p>Dự án trung tâm thương mại 25 tầng với tổng diện tích sàn 80.000m². Thanh Chương JSC tham gia kiểm định chất lượng bê tông và cốt thép.</p>",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800",
      featured: true,
    },
    {
      slug: "khu-do-thi-bac-ninh",
      title: "Khu đô thị Bắc Ninh",
      client: "Công ty XYZ",
      location: "Bắc Ninh",
      year: 2023,
      category: "Khu đô thị",
      excerpt: "Thí nghiệm nén tĩnh cọc và khảo sát địa chất cho khu đô thị mới.",
      content: "<p>Khu đô thị mới rộng 50ha với hơn 2.000 căn hộ. Thanh Chương tham gia thí nghiệm nền móng.</p>",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      featured: true,
    },
    {
      slug: "cao-oc-van-phong-lang-son",
      title: "Cao ốc văn phòng Lạng Sơn",
      client: "Sở Xây dựng Lạng Sơn",
      location: "Lạng Sơn",
      year: 2024,
      category: "Văn phòng",
      excerpt: "Tư vấn giám sát thi công và kiểm định chất lượng công trình.",
      content: "<p>Cao ốc văn phòng 18 tầng tại trung tâm thành phố Lạng Sơn.</p>",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      featured: false,
    },
    {
      slug: "nha-may-cong-nghiep-hai-phong",
      title: "Nhà máy công nghiệp Hải Phòng",
      client: "Công ty TNHH DEF",
      location: "Hải Phòng",
      year: 2024,
      category: "Công nghiệp",
      excerpt: "Khảo sát địa chất và thí nghiệm nền móng nhà máy.",
      content: "<p>Nhà máy sản xuất công nghiệp rộng 20.000m² tại KCN Hải Phòng.</p>",
      image: "https://images.unsplash.com/photo-1599056407101-7c557a4a0144?w=800",
      featured: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`✅ Đã tạo ${projects.length} dự án`);

  // 4. Tạo Posts
  const posts = [
    {
      slug: "quy-trinh-kiem-dinh-be-tong",
      title: "Quy trình kiểm định chất lượng bê tông tại công trình",
      excerpt: "Tìm hiểu về quy trình kiểm định chất lượng bê tông đạt chuẩn theo TCVN và các phương pháp thí nghiệm hiện đại nhất.",
      content: "<p>Quy trình kiểm định chất lượng bê tông bao gồm nhiều bước từ lấy mẫu đến phân tích kết quả.</p>",
      image: "https://images.unsplash.com/photo-1503387837949-37a0f9c00a8b?w=800",
      category: "Kiến thức",
      publishedAt: new Date("2026-09-20"),
    },
    {
      slug: "tieu-chuan-thi-nghiem-nen-tinh-coc-2026",
      title: "Tiêu chuẩn mới về thí nghiệm nén tĩnh cọc năm 2026",
      excerpt: "Cập nhật những thay đổi mới nhất trong tiêu chuẩn thí nghiệm nén tĩnh cọc theo TCVN và ứng dụng thực tế tại Việt Nam.",
      content: "<p>Năm 2026 có nhiều cập nhật mới về tiêu chuẩn thí nghiệm nén tĩnh cọc.</p>",
      image: "https://images.unsplash.com/photo-1591843357221-9b3ed87b8d3c?w=800",
      category: "Tiêu chuẩn",
      publishedAt: new Date("2026-09-15"),
    },
    {
      slug: "vai-tro-giam-sat-thi-cong",
      title: "Vai trò của giám sát thi công xây dựng",
      excerpt: "Giám sát thi công xây dựng là gì? Tại sao quan trọng? Những điều cần biết về tư vấn giám sát trong xây dựng.",
      content: "<p>Giám sát thi công đóng vai trò then chốt trong việc đảm bảo chất lượng công trình.</p>",
      image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=800",
      category: "Kiến thức",
      publishedAt: new Date("2026-09-10"),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✅ Đã tạo ${posts.length} bài viết`);

  console.log("🎉 Seed hoàn tất!");
  console.log("");
  console.log("📋 Thông tin đăng nhập:");
  console.log("   URL:    http://localhost:3000/admin/login");
  console.log("   Email:  admin@thanhchuong.vn");
  console.log("   Pass:   admin123");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
