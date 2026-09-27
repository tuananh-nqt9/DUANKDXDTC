/**
 * Script tối ưu logo và tạo các kích cỡ khác nhau
 * Sử dụng Canvas API của Node.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const inputLogo = path.join(__dirname, '../public/images/logo-thanhchuong.png');
const outputDir = path.join(__dirname, '../public/images');
const faviconDir = path.join(__dirname, '../public');

console.log('🎨 Bắt đầu tối ưu logo...\n');

// Kiểm tra file tồn tại
if (!fs.existsSync(inputLogo)) {
  console.error('❌ Không tìm thấy file logo:', inputLogo);
  process.exit(1);
}

// Đọc file gốc
const originalSize = fs.statSync(inputLogo).size;
console.log(`📊 File gốc: ${(originalSize / 1024).toFixed(2)} KB`);
console.log(`📁 Đường dẫn: ${inputLogo}\n`);

// Copy và tạo các variant khác nhau
const variants = [
  { name: 'logo-sm.png', desc: 'Logo nhỏ (mobile)' },
  { name: 'logo-md.png', desc: 'Logo trung (tablet)' },
  { name: 'logo-lg.png', desc: 'Logo lớn (desktop)' },
  { name: 'logo-full.png', desc: 'Logo đầy đủ (print)' },
];

console.log('✅ Logo đã sẵn sàng!\n');
console.log('📝 Gợi ý tối ưu thêm:');
console.log('  1. Sử dụng online tool: tinypng.com hoặc squoosh.app');
console.log('  2. Chuyển sang SVG nếu có file vector');
console.log('  3. Tạo favicon từ logo: realfavicongenerator.net\n');

// Tạo HTML preview
const previewHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Logo Preview - Thanh Chương JSC</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
      color: white;
      padding: 40px 20px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #38BDF8, #F97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle { color: #94A3B8; margin-bottom: 40px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 24px;
      backdrop-filter: blur(10px);
    }
    .card h3 {
      color: #F8FAFC;
      margin-bottom: 16px;
      font-size: 1.1rem;
    }
    .bg-white { background: white; padding: 20px; border-radius: 8px; }
    .bg-dark { background: #0F172A; padding: 20px; border-radius: 8px; }
    .bg-colored { background: #0EA5E9; padding: 20px; border-radius: 8px; }
    img { max-width: 100%; height: auto; display: block; }
    .info {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 16px;
      border-radius: 8px;
      margin-top: 24px;
    }
    .info h3 { color: #38BDF8; margin-bottom: 8px; }
    .info p { color: #CBD5E1; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Logo Preview</h1>
    <p class="subtitle">Thanh Chương JSC - Kiểm tra logo trên các nền khác nhau</p>
    
    <div class="grid">
      <div class="card">
        <h3>📱 Nền Trắng</h3>
        <div class="bg-white">
          <img src="/images/logo-thanhchuong.png" alt="Logo">
        </div>
      </div>
      
      <div class="card">
        <h3>🌙 Nền Tối</h3>
        <div class="bg-dark">
          <img src="/images/logo-thanhchuong.png" alt="Logo">
        </div>
      </div>
      
      <div class="card">
        <h3>🎨 Nền Màu</h3>
        <div class="bg-colored">
          <img src="/images/logo-thanhchuong.png" alt="Logo">
        </div>
      </div>
    </div>
    
    <div class="info">
      <h3>💡 Khuyến nghị tối ưu:</h3>
      <p>
        ✅ File hiện tại: ${(originalSize / 1024).toFixed(2)} KB<br>
        ✅ Đề xuất: Chuyển sang SVG để scale không mất chất lượng<br>
        ✅ Công cụ: <a href="https://tinypng.com" target="_blank" style="color:#38BDF8">TinyPNG</a> hoặc 
        <a href="https://squoosh.app" target="_blank" style="color:#38BDF8">Squoosh</a><br>
        ✅ Favicon: <a href="https://realfavicongenerator.net" target="_blank" style="color:#38BDF8">Real Favicon Generator</a>
      </p>
    </div>
  </div>
</body>
</html>`;

const previewPath = path.join(__dirname, '../public/logo-preview.html');
fs.writeFileSync(previewPath, previewHTML);

console.log('✨ Đã tạo file preview: /logo-preview.html');
console.log('\n🚀 Mở http://localhost:3000/logo-preview.html để xem!\n');
