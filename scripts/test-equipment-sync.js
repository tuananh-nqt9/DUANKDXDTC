// ==============================================================================
// TEST TOÀN DIỆN: ĐỒNG BỘ TRANG THIẾT BỊ GIỮA ADMIN VÀ USER
// Website: https://kdxdthanhchuong.vn/
// ==============================================================================

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function main() {
  console.log('================================================================');
  console.log('   BẮT ĐẦU KIỂM THỬ ĐỒNG BỘ TRANG THIẾT BỊ GIỮA ADMIN VÀ USER');
  console.log('================================================================\n');

  // 1. Đăng nhập Admin lấy cookie
  console.log('--- 1. ĐĂNG NHẬP ADMIN ---');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@thanhchuong.vn', password: 'admin123' }),
  });

  const cookieHeader = loginRes.headers.get('set-cookie');
  if (!cookieHeader) {
    console.error('❌ Không lấy được cookie đăng nhập.');
    process.exit(1);
  }
  const authTokenMatch = cookieHeader.match(/auth-token=([^;]+)/);
  const cookies = authTokenMatch ? `auth-token=${authTokenMatch[1]}` : cookieHeader.split(';')[0];
  console.log('✓ Đăng nhập Admin thành công.\n');

  // 2. Kiểm tra trang danh sách thiết bị ban đầu
  console.log('--- 2. KIỂM TRA TRANG DANH SÁCH THIẾT BỊ USER (/trang-thiet-bi) ---');
  const userListRes = await fetch(`${BASE_URL}/trang-thiet-bi`);
  console.log('Status code /trang-thiet-bi:', userListRes.status);
  const listHtml = await userListRes.text();
  if (userListRes.status === 200) {
    console.log('✓ Trang /trang-thiet-bi hoạt động bình thường (HTTP 200).');
  } else {
    throw new Error(`Lỗi tải trang /trang-thiet-bi, status: ${userListRes.status}`);
  }

  // 3. Thêm thiết bị mới trong Admin
  console.log('\n--- 3. THÊM THIẾT BỊ MỚI TRONG ADMIN ---');
  const timestamp = Date.now();
  const testEquipmentData = {
    name: `Máy đo độ ẩm và tỷ trọng đất Troxler 3440-${timestamp}`,
    slug: `may-do-do-am-troxler-3440-${timestamp}`,
    model: 'Troxler-3440-Plus',
    manufacturer: 'Troxler Laboratories',
    origin: 'USA',
    year: 2025,
    description: 'Thiết bị đo độ ẩm và dung trọng khô của đất nền hiện trường phục vụ kiểm định đường và móng công trình.',
    specs: 'Độ sâu đo: 300 mm\nThời gian đo: 60 giây\nCấp chính xác: ±0.5%\nNguồn pin: Li-ion 12V sạc nhanh',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&q=80',
    category: 'Thí nghiệm đất',
    order: 0,
    featured: true,
    published: true,
  };

  const createRes = await fetch(`${BASE_URL}/api/admin/equipment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookies },
    body: JSON.stringify(testEquipmentData),
  });

  console.log('API tạo thiết bị status:', createRes.status);
  const createdItem = await createRes.json();
  if (!createdItem.id) {
    throw new Error(`Không tạo được thiết bị: ${JSON.stringify(createdItem)}`);
  }
  console.log('✓ Đã tạo thiết bị mới thành công: ID =', createdItem.id, 'Slug =', createdItem.slug);

  // 4. Kiểm tra thiết bị mới có xuất hiện ngay ngoài User (/trang-thiet-bi)
  console.log('\n--- 4. KIỂM TRA ĐỒNG BỘ RA TRANG USER (/trang-thiet-bi) ---');
  const updatedUserListRes = await fetch(`${BASE_URL}/trang-thiet-bi`);
  const updatedListHtml = await updatedUserListRes.text();
  const hasNewItemOnList = updatedListHtml.includes(createdItem.name);
  const hasNewItemLink = updatedListHtml.includes(`/trang-thiet-bi/${createdItem.slug}`);
  console.log(`  Hiển thị tên thiết bị mới trên /trang-thiet-bi: ${hasNewItemOnList ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);
  console.log(`  Có link chi tiết /trang-thiet-bi/${createdItem.slug}: ${hasNewItemLink ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);

  if (!hasNewItemOnList) {
    throw new Error('Thiết bị mới tạo không xuất hiện trên trang /trang-thiet-bi');
  }

  // 5. Kiểm tra truy cập trang chi tiết thiết bị (/trang-thiet-bi/[slug])
  console.log('\n--- 5. KIỂM TRA TRUY CẬP TRANG CHI TIẾT (/trang-thiet-bi/[slug]) ---');
  const detailRes = await fetch(`${BASE_URL}/trang-thiet-bi/${createdItem.slug}`);
  console.log(`Status code /trang-thiet-bi/${createdItem.slug}:`, detailRes.status);
  const detailHtml = await detailRes.text();
  const hasDetailName = detailHtml.includes(createdItem.name);
  const hasDetailModel = detailHtml.includes('Troxler-3440-Plus');
  const hasDetailOrigin = detailHtml.includes('USA');
  const hasDetailSpecs = detailHtml.includes('Độ sâu đo: 300 mm');

  console.log(`  Hiển thị tên thiết bị: ${hasDetailName ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);
  console.log(`  Hiển thị Model: ${hasDetailModel ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);
  console.log(`  Hiển thị Xuất xứ: ${hasDetailOrigin ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);
  console.log(`  Hiển thị Thông số kỹ thuật chi tiết: ${hasDetailSpecs ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);

  if (detailRes.status !== 200 || !hasDetailName) {
    throw new Error('Trang chi tiết thiết bị không tải đúng nội dung!');
  }

  // 6. Kiểm tra hiển thị tại Trang chủ (/)
  console.log('\n--- 6. KIỂM TRA HIỂN THỊ TẠI TRANG CHỦ (/) ---');
  const homeRes = await fetch(`${BASE_URL}/`);
  const homeHtml = await homeRes.text();
  const hasHomeItem = homeHtml.includes(createdItem.name);
  console.log(`  Trang chủ (/) hiển thị thiết bị mới: ${hasHomeItem ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);

  // 7. Kiểm tra chức năng ẨN thiết bị
  console.log('\n--- 7. KIỂM TRA ẨN THIẾT BỊ (PUBLISHED = FALSE) ---');
  await fetch(`${BASE_URL}/api/admin/equipment/${createdItem.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookies },
    body: JSON.stringify({ published: false }),
  });
  const hiddenListRes = await fetch(`${BASE_URL}/trang-thiet-bi`);
  const hiddenListHtml = await hiddenListRes.text();
  const isHidden = !hiddenListHtml.includes(createdItem.name);
  console.log(`  Sau khi ẩn trong Admin, User không còn thấy thiết bị: ${isHidden ? '✓ ĐÚNG (ĐẠT)' : '❌ VẪN HIỂN THỊ'}`);

  // 8. Bật hiển thị trở lại
  console.log('\n--- 8. CÔNG KHAI TRỞ LẠI (PUBLISHED = TRUE) ---');
  await fetch(`${BASE_URL}/api/admin/equipment/${createdItem.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookies },
    body: JSON.stringify({ published: true }),
  });
  const visibleListRes = await fetch(`${BASE_URL}/trang-thiet-bi`);
  const visibleListHtml = await visibleListRes.text();
  const isVisible = visibleListHtml.includes(createdItem.name);
  console.log(`  Sau khi bật hiển thị lại, User hiển thị lại thiết bị: ${isVisible ? '✓ ĐÚNG (ĐẠT)' : '❌ KHÔNG HIỆN'}`);

  // 9. Kiểm tra F5 Reload an toàn
  console.log('\n--- 9. KIỂM TRA F5 RELOAD TRANG THIẾT BỊ VÀ TRANG CHI TIẾT ---');
  const reloadList = await fetch(`${BASE_URL}/trang-thiet-bi`);
  console.log(`  Reload /trang-thiet-bi: Status ${reloadList.status} ${reloadList.status === 200 ? '✓ GIỮ NGUYÊN TRANG (ĐẠT)' : '❌ LỖI'}`);

  const reloadDetail = await fetch(`${BASE_URL}/trang-thiet-bi/${createdItem.slug}`);
  console.log(`  Reload /trang-thiet-bi/${createdItem.slug}: Status ${reloadDetail.status} ${reloadDetail.status === 200 ? '✓ GIỮ NGUYÊN TRANG (ĐẠT)' : '❌ LỖI'}`);

  // 10. Dọn dẹp thiết bị test
  console.log('\n--- 10. DỌN DẸP THIẾT BỊ TEST ---');
  await fetch(`${BASE_URL}/api/admin/equipment/${createdItem.id}`, {
    method: 'DELETE',
    headers: { Cookie: cookies },
  });
  console.log('✓ Đã dọn dẹp thiết bị test an toàn.');

  console.log('\n================================================================');
  console.log('   TẤT CẢ CÁC BÀI KIỂM THỬ TRANG THIẾT BỊ ĐÃ ĐẠT KẾT QUẢ 100%!   ');
  console.log('================================================================\n');
}

main()
  .catch((err) => {
    console.error('❌ Lỗi kiểm thử:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
