const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  // Арт-объекты
  { input: 'public/img/products/art-1.jpg', output: 'public/img/products/art-1.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/art-2.jpg', output: 'public/img/products/art-2.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/art-3.jpg', output: 'public/img/products/art-3.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  // Столы из эпоксидной смолы
  { input: 'public/img/products/epoxy-tables-1.jpg', output: 'public/img/products/epoxy-tables-1.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/epoxy-tables-2.jpg', output: 'public/img/products/epoxy-tables-2.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/epoxy-tables-3.jpg', output: 'public/img/products/epoxy-tables-3.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  // Мебель на заказ
  { input: 'public/img/products/custom-furniture-1.jpg', output: 'public/img/products/custom-furniture-1.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/custom-furniture-2.jpg', output: 'public/img/products/custom-furniture-2.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/custom-furniture-3.jpg', output: 'public/img/products/custom-furniture-3.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  // ЧПУ
  { input: 'public/img/products/cnc-1.jpg', output: 'public/img/products/cnc-1.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/cnc-2.jpg', output: 'public/img/products/cnc-2.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
  { input: 'public/img/products/cnc-3.jpg', output: 'public/img/products/cnc-3.jpg', width: 1200, height: 1500, quality: 85, fit: 'inside' },
];

// Кейсы: 16:9, до ~150 KB
const caseImages = [
  { input: 'public/img/cases/c01.jpg', output: 'public/img/cases/c01.jpg', width: 1200, height: 675, quality: 82, fit: 'cover' },
  { input: 'public/img/cases/c02.jpg', output: 'public/img/cases/c02.jpg', width: 1200, height: 675, quality: 82, fit: 'cover' },
  { input: 'public/img/cases/c03.jpg', output: 'public/img/cases/c03.jpg', width: 1200, height: 675, quality: 82, fit: 'cover' },
];

// Галерея: квадрат 1200x1200, до ~250 KB
const galleryImages = Array.from({ length: 12 }, (_, i) => {
  const name = `g${String(i + 1).padStart(2, '0')}.jpg`;
  return { input: `public/img/gallery/${name}`, output: `public/img/gallery/${name}`, width: 1200, height: 1200, quality: 80, fit: 'cover' };
});

async function optimizeImage(inputPath, outputPath, options = { width: 1200, height: 1500, quality: 85, fit: 'inside' }) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024).toFixed(2);
    
    console.log(`Optimizing ${path.basename(inputPath)} (${originalSize} KB)...`);
    
    const tempPath = outputPath + '.tmp';
    
    await sharp(inputPath)
      .resize(options.width, options.height, {
        withoutEnlargement: true,
        fit: options.fit || 'inside'
      })
      .jpeg({ 
        quality: options.quality,
        mozjpeg: true,
        progressive: true
      })
      .toFile(tempPath);
    
    // Заменяем оригинал оптимизированной версией
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024).toFixed(2);
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(outputPath)}: ${originalSize} KB → ${newSize} KB (${reduction}% reduction)`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Starting image optimization...\n');
  
  const all = [...imagesToOptimize, ...caseImages, ...galleryImages];
  for (const img of all) {
    if (fs.existsSync(img.input)) {
      await optimizeImage(img.input, img.output, { width: img.width, height: img.height, quality: img.quality, fit: img.fit });
    } else {
      console.log(`⚠ File not found: ${img.input}`);
    }
  }
  
  console.log('\n✓ Optimization complete!');
}

main().catch(console.error);
