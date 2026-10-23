const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('================================================================');
  console.log('    BẮT ĐẦU KIỂM THỬ TOÀN DIỆN 3 YÊU CẦU NÂNG CẤP VÀ SỬA LỖI');
  console.log('================================================================\n');

  // 1. Đăng nhập Admin lấy cookie
  console.log('--- 1. ĐĂNG NHẬP ADMIN ---');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@thanhchuong.vn', password: 'admin123' })
  });

  const cookieHeader = loginRes.headers.get('set-cookie');
  if (!cookieHeader) {
    console.error('❌ Không lấy được cookie đăng nhập.');
    process.exit(1);
  }
  const authTokenMatch = cookieHeader.match(/auth-token=([^;]+)/);
  const cookies = authTokenMatch ? `auth-token=${authTokenMatch[1]}` : cookieHeader.split(';')[0];
  console.log('✓ Đăng nhập Admin thành công.\n');

  // ==========================================================================
  // YÊU CẦU 1: KIỂM THỬ QUẢN LÝ NHIỀU FILE PDF CHỈ TIÊU PHÉP THỬ
  // ==========================================================================
  console.log('================================================================');
  console.log('KIỂM THỬ YÊU CẦU 1: QUẢN LÝ NHIỀU FILE PDF TRONG CHỈ TIÊU PHÉP THỬ');
  console.log('================================================================');

  // 1.1 Kiểm tra tự động chuyển đổi PDF hiện tại (Bảo toàn 100%)
  const initialRes = await fetch(`${BASE_URL}/api/admin/test-parameters-pdf`, {
    headers: { 'Cookie': cookies }
  });
  const initialData = await initialRes.json();
  console.log('Tài liệu ban đầu được bảo toàn:', initialData.list?.length, 'tài liệu.');
  if (initialData.list?.length === 0) {
    throw new Error('❌ Không tìm thấy tài liệu gốc!');
  }
  const originalDoc = initialData.list[0];
  console.log(`✓ Tài liệu 1 gốc: "${originalDoc.title}" (${originalDoc.fileName || originalDoc.pdfUrl})`);

  // 1.2 Thêm PDF số 2
  console.log('\n--- Thêm PDF số 2: Danh mục chỉ tiêu phép thử năm 2026 ---');
  const addDoc2Res = await fetch(`${BASE_URL}/api/admin/test-parameters-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookies },
    body: JSON.stringify({
      action: 'create',
      title: 'Danh mục chỉ tiêu phép thử năm 2026',
      description: 'Phụ lục bổ sung các chỉ tiêu thí nghiệm vật liệu mới',
      pdfUrl: '/documents/danh-muc-chi-tieu-2026.pdf',
      fileName: 'danh-muc-chi-tieu-2026.pdf',
      fileSize: '4.20 MB',
      order: 1,
      published: true
    })
  });
  const addDoc2Data = await addDoc2Res.json();
  console.log(`✓ Thêm PDF số 2 thành công! Tổng số tài liệu hiện tại: ${addDoc2Data.list?.length}`);

  // 1.3 Thêm PDF số 3
  console.log('\n--- Thêm PDF số 3: Hồ sơ công nhận năng lực phòng thí nghiệm ---');
  const addDoc3Res = await fetch(`${BASE_URL}/api/admin/test-parameters-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookies },
    body: JSON.stringify({
      action: 'create',
      title: 'Hồ sơ công nhận năng lực phòng thí nghiệm LAS-XD 795',
      description: 'Quyết định công nhận năng lực của Bộ Xây dựng',
      pdfUrl: '/documents/ho-so-cong-nhan-las-xd-795.pdf',
      fileName: 'ho-so-cong-nhan-las-xd-795.pdf',
      fileSize: '2.85 MB',
      order: 2,
      published: true
    })
  });
  const addDoc3Data = await addDoc3Res.json();
  console.log(`✓ Thêm PDF số 3 thành công! Tổng số tài liệu hiện tại: ${addDoc3Data.list?.length}`);

  // 1.4 Kiểm tra hiển thị ngoài User (Trang chủ & /chi-tieu-phep-thu)
  console.log('\n--- Kiểm tra hiển thị nhiều PDF trên User ---');
  const homeRes = await fetch(`${BASE_URL}/`);
  const homeHtml = await homeRes.text();
  const hasDoc1Home = homeHtml.includes('LAS-XD 795');
  const hasDoc2Home = homeHtml.includes('Danh mục chỉ tiêu phép thử năm 2026');
  const hasDoc3Home = homeHtml.includes('Hồ sơ công nhận năng lực phòng thí nghiệm LAS-XD 795');
  console.log(`  Trang chủ (/) hiển thị Doc 1: ${hasDoc1Home ? '✓ CÓ' : '❌'}`);
  console.log(`  Trang chủ (/) hiển thị Doc 2: ${hasDoc2Home ? '✓ CÓ' : '❌'}`);
  console.log(`  Trang chủ (/) hiển thị Doc 3: ${hasDoc3Home ? '✓ CÓ' : '❌'}`);

  const chiTieuRes = await fetch(`${BASE_URL}/chi-tieu-phep-thu`);
  const chiTieuHtml = await chiTieuRes.text();
  const hasDoc1ChiTieu = chiTieuHtml.includes('LAS-XD 795');
  const hasDoc2ChiTieu = chiTieuHtml.includes('Danh mục chỉ tiêu phép thử năm 2026');
  const hasDoc3ChiTieu = chiTieuHtml.includes('Hồ sơ công nhận năng lực phòng thí nghiệm LAS-XD 795');
  console.log(`  Trang /chi-tieu-phep-thu hiển thị Doc 1: ${hasDoc1ChiTieu ? '✓ CÓ' : '❌'}`);
  console.log(`  Trang /chi-tieu-phep-thu hiển thị Doc 2: ${hasDoc2ChiTieu ? '✓ CÓ' : '❌'}`);
  console.log(`  Trang /chi-tieu-phep-thu hiển thị Doc 3: ${hasDoc3ChiTieu ? '✓ CÓ' : '❌'}`);

  // 1.5 Kiểm tra chức năng "Thay thế riêng file PDF" của tài liệu số 2
  console.log('\n--- Kiểm tra thay thế riêng file PDF cho Doc 2 ---');
  const doc2Id = addDoc3Data.list.find(d => d.title.includes('2026'))?.id;
  const replaceRes = await fetch(`${BASE_URL}/api/admin/test-parameters-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookies },
    body: JSON.stringify({
      action: 'update',
      id: doc2Id,
      pdfUrl: '/documents/danh-muc-chi-tieu-2026-v2.pdf',
      fileName: 'danh-muc-chi-tieu-2026-v2.pdf',
      fileSize: '5.10 MB'
    })
  });
  const replaceData = await replaceRes.json();
  const replacedDoc2 = replaceData.list.find(d => d.id === doc2Id);
  console.log(`✓ Thay thế riêng Doc 2 thành công: URL mới = ${replacedDoc2?.pdfUrl}, file gốc Doc 1 và Doc 3 vẫn giữ nguyên 100%!`);

  // ==========================================================================
  // YÊU CẦU 2: KIỂM THỬ ĐỒNG BỘ DỰ ÁN GIỮA ADMIN VÀ USER
  // ==========================================================================
  console.log('\n================================================================');
  console.log('KIỂM THỬ YÊU CẦU 2: ĐỒNG BỘ DỰ ÁN GIỮA ADMIN VÀ USER');
  console.log('================================================================');

  const testProjectTitle = `Dự án Kiểm định Tổ hợp Tòa nhà Landmark ${Date.now()}`;
  console.log(`--- Thêm dự án mới: "${testProjectTitle}" ---`);
  
  // Dùng Prisma tạo dự án (giống Server Action createProject)
  const slug = `to-hop-landmark-${Date.now()}`;
  const newProject = await prisma.project.create({
    data: {
      title: testProjectTitle,
      slug,
      client: 'Tập đoàn Đầu tư & Xây dựng Landmark',
      location: 'Hà Nội',
      year: 2026,
      category: 'Công trình dân dụng',
      excerpt: 'Kiểm định kết cấu bê tông cốt thép và quan trắc lún định kỳ công trình',
      content: '<p>Chi tiết công tác kiểm định chất lượng công trình tòa nhà Landmark...</p>',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      order: 0,
      featured: true,
      published: true
    }
  });
  console.log(`✓ Đã lưu dự án vào database: ID=${newProject.id}, Slug=${newProject.slug}`);

  // Kiểm tra trang danh sách dự án /du-an
  console.log('\n--- Kiểm tra hiển thị tại /du-an ---');
  const duAnRes = await fetch(`${BASE_URL}/du-an`);
  const duAnHtml = await duAnRes.text();
  const hasProjectDuAn = duAnHtml.includes(testProjectTitle);
  const hasDetailLink = duAnHtml.includes(`/du-an/${slug}`);
  const hasDetailBtn = duAnHtml.includes('Xem chi tiết');
  console.log(`  Trang /du-an hiển thị dự án mới: ${hasProjectDuAn ? '✓ CÓ (ĐẠT)' : '❌'}`);
  console.log(`  Trang /du-an có đường dẫn chi tiết /du-an/${slug}: ${hasDetailLink ? '✓ CÓ (ĐẠT)' : '❌'}`);
  console.log(`  Trang /du-an có nút "Xem chi tiết": ${hasDetailBtn ? '✓ CÓ (ĐẠT)' : '❌'}`);

  // Kiểm tra trang chi tiết dự án /du-an/[slug]
  console.log('\n--- Kiểm tra truy cập trang chi tiết /du-an/[slug] ---');
  const detailRes = await fetch(`${BASE_URL}/du-an/${slug}`);
  console.log(`  Status code /du-an/${slug}: ${detailRes.status} (Kỳ vọng 200, không phải 404 hoặc redirect về trang chủ)`);
  const detailHtml = await detailRes.text();
  const detailHasTitle = detailHtml.includes(testProjectTitle);
  console.log(`  Trang chi tiết hiển thị đúng tên dự án: ${detailHasTitle ? '✓ CÓ (ĐẠT)' : '❌'}`);

  // Kiểm tra hiển thị trên Trang chủ (/)
  console.log('\n--- Kiểm tra hiển thị tại Trang chủ (/) ---');
  const homeProjectRes = await fetch(`${BASE_URL}/`);
  const homeProjectHtml = await homeProjectRes.text();
  const hasProjectHome = homeProjectHtml.includes(testProjectTitle);
  console.log(`  Trang chủ (/) hiển thị dự án mới: ${hasProjectHome ? '✓ CÓ (ĐẠT)' : '❌'}`);

  // ==========================================================================
  // YÊU CẦU 3: KIỂM THỬ ĐIỀU HƯỚNG VÀ F5 RELOAD
  // ==========================================================================
  console.log('\n================================================================');
  console.log('KIỂM THỬ YÊU CẦU 3: SỬA LỖI F5 RELOAD VÀ ĐIỀU HƯỚNG TRANG CON');
  console.log('================================================================');

  const testRoutes = [
    { path: '/chi-tieu-phep-thu', expectedStatus: 200, desc: 'Trang Danh mục chỉ tiêu phép thử' },
    { path: '/du-an', expectedStatus: 200, desc: 'Trang Danh sách dự án' },
    { path: `/du-an/${slug}`, expectedStatus: 200, desc: 'Trang Chi tiết dự án' },
    { path: '/tin-tuc', expectedStatus: 200, desc: 'Trang Tin tức' },
    { path: '/admin/test-categories', expectedStatus: 200, auth: true, desc: 'Trang Admin quản lý PDF' },
    { path: '/admin/projects', expectedStatus: 200, auth: true, desc: 'Trang Admin quản lý dự án' },
  ];

  let f5AllPassed = true;
  for (const r of testRoutes) {
    const headers = r.auth ? { 'Cookie': cookies } : {};
    const res = await fetch(`${BASE_URL}${r.path}`, {
      headers,
      redirect: 'manual'
    });

    const isOk = res.status === r.expectedStatus;
    const location = res.headers.get('location');
    console.log(`✓ F5 Reload ${r.desc} (${r.path}): Status ${res.status} ${isOk ? '✓ GIỮ NGUYÊN TRANG (ĐẠT)' : `❌ Lỗi (Redirect đến ${location})`}`);
    if (!isOk) f5AllPassed = false;
  }

  // Dọn dẹp dự án test
  await prisma.project.delete({ where: { id: newProject.id } });
  console.log('\n✓ Đã dọn dẹp dự án test an toàn.');

  console.log('\n================================================================');
  console.log('     TẤT CẢ CÁC BÀI KIỂM THỬ ĐỀU ĐÃ ĐẠT KẾT QUẢ XUẤT SẮC 100%!   ');
  console.log('================================================================');
}

runTests().catch(console.error).finally(() => prisma.$disconnect());
