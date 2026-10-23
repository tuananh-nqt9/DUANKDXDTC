const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function main() {
  console.log('================================================================');
  console.log('    KIỂM TRA SỬA LỖI TRANG ADMIN DỰ ÁN VÀ TRANG THIẾT BỊ');
  console.log('================================================================\n');

  // 1. Đăng nhập Admin
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

  // 2. Kiểm tra /admin/projects
  console.log('--- 2. KIỂM TRA TRANG /admin/projects ---');
  const projectsRes = await fetch(`${BASE_URL}/admin/projects`, {
    headers: { Cookie: cookies },
  });
  console.log('Status code /admin/projects:', projectsRes.status);
  const projectsHtml = await projectsRes.text();

  const hasProjectsTitle = projectsHtml.includes('Quản lý Dự án');
  const hasErrorScreen = projectsHtml.includes('Đã có lỗi xảy ra!');
  const hasUserFooter = projectsHtml.includes('LIÊN HỆ VỚI CHÚNG TÔI') || projectsHtml.includes('GP số 0108343162');

  console.log(`  Có tiêu đề "Quản lý Dự án": ${hasProjectsTitle ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);
  console.log(`  Bị màn hình lỗi ("Đã có lỗi xảy ra!"): ${hasErrorScreen ? '❌ CÓ LỖI' : '✓ KHÔNG (ĐẠT)'}`);
  console.log(`  Bị lọt footer trang User: ${hasUserFooter ? '❌ BỊ LỌT' : '✓ KHÔNG (ĐẠT)'}`);

  if (projectsRes.status !== 200 || !hasProjectsTitle || hasErrorScreen || hasUserFooter) {
    throw new Error('Trang /admin/projects vẫn còn lỗi!');
  }

  // 3. Kiểm tra /admin/equipment
  console.log('\n--- 3. KIỂM TRA TRANG /admin/equipment ---');
  const equipmentRes = await fetch(`${BASE_URL}/admin/equipment`, {
    headers: { Cookie: cookies },
  });
  console.log('Status code /admin/equipment:', equipmentRes.status);
  const equipmentHtml = await equipmentRes.text();

  const hasEquipmentTitle = equipmentHtml.includes('Quản lý Trang thiết bị');
  const hasEquipErrorScreen = equipmentHtml.includes('Đã có lỗi xảy ra!');
  const hasEquipUserFooter = equipmentHtml.includes('LIÊN HỆ VỚI CHÚNG TÔI') || equipmentHtml.includes('GP số 0108343162');

  console.log(`  Có tiêu đề "Quản lý Trang thiết bị": ${hasEquipmentTitle ? '✓ CÓ (ĐẠT)' : '❌ KHÔNG'}`);
  console.log(`  Bị màn hình lỗi ("Đã có lỗi xảy ra!"): ${hasEquipErrorScreen ? '❌ CÓ LỖI' : '✓ KHÔNG (ĐẠT)'}`);
  console.log(`  Bị lọt footer trang User: ${hasEquipUserFooter ? '❌ BỊ LỌT' : '✓ KHÔNG (ĐẠT)'}`);

  if (equipmentRes.status !== 200 || !hasEquipmentTitle || hasEquipErrorScreen || hasEquipUserFooter) {
    throw new Error('Trang /admin/equipment vẫn còn lỗi!');
  }

  // 4. Kiểm tra F5 Reload cả hai trang
  console.log('\n--- 4. KIỂM TRA F5 RELOAD ---');
  const reloadProjects = await fetch(`${BASE_URL}/admin/projects`, { headers: { Cookie: cookies } });
  console.log(`  F5 /admin/projects: Status ${reloadProjects.status} ${reloadProjects.status === 200 ? '✓ GIỮ NGUYÊN TRANG (ĐẠT)' : '❌ LỖI'}`);

  const reloadEquipment = await fetch(`${BASE_URL}/admin/equipment`, { headers: { Cookie: cookies } });
  console.log(`  F5 /admin/equipment: Status ${reloadEquipment.status} ${reloadEquipment.status === 200 ? '✓ GIỮ NGUYÊN TRANG (ĐẠT)' : '❌ LỖI'}`);

  console.log('\n================================================================');
  console.log('   CẢ HAI TRANG /admin/projects VÀ /admin/equipment ĐÃ HOẠT ĐỘNG HOÀN HẢO!');
  console.log('================================================================\n');
}

main()
  .catch((err) => {
    console.error('❌ Kiểm tra thất bại:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
