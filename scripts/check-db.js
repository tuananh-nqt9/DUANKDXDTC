const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.setting.findMany();
  console.log('=== SETTINGS ===');
  settings.forEach(s => console.log(s.key, '=>', s.value));

  const projects = await prisma.project.findMany();
  console.log('=== PROJECTS ===', projects.length);
  projects.forEach(p => console.log({
    id: p.id,
    title: p.title,
    slug: p.slug,
    published: p.published,
    featured: p.featured,
    image: p.image
  }));

  const docs = await prisma.document.findMany();
  console.log('=== DOCUMENTS ===', docs.length);

  const equipments = await prisma.equipment.findMany();
  console.log('=== EQUIPMENTS ===', equipments.length, equipments);

  // Deduplicate identical pdfUrls if any
  const testPdfs = await prisma.testParameterPdf.findMany({ orderBy: { createdAt: 'asc' } });
  const seenUrls = new Set();
  for (const item of testPdfs) {
    if (seenUrls.has(item.pdfUrl)) {
      await prisma.testParameterPdf.delete({ where: { id: item.id } });
      console.log('Removed duplicate item:', item.id, item.pdfUrl);
    } else {
      seenUrls.add(item.pdfUrl);
    }
  }

  const finalTestPdfs = await prisma.testParameterPdf.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });
  console.log('=== TEST PARAMETER PDFS ===', finalTestPdfs.length, finalTestPdfs);
}

main().catch(console.error).finally(() => prisma.$disconnect());
