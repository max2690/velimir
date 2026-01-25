const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  { input: 'public/img/products/art-1.jpg', output: 'public/img/products/art-1.jpg' },
  { input: 'public/img/products/art-2.jpg', output: 'public/img/products/art-2.jpg' },
  { input: 'public/img/products/art-3.jpg', output: 'public/img/products/art-3.jpg' },
];

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024).toFixed(2);
    
    console.log(`Optimizing ${path.basename(inputPath)} (${originalSize} KB)...`);
    
    // Создаем временный файл
    const tempPath = outputPath + '.tmp';
    
    // Оптимизация: качество 85%, максимальная ширина 1200px (сохраняем пропорции)
    await sharp(inputPath)
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: 85,
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
  
  for (const img of imagesToOptimize) {
    if (fs.existsSync(img.input)) {
      await optimizeImage(img.input, img.output);
    } else {
      console.log(`⚠ File not found: ${img.input}`);
    }
  }
  
  console.log('\n✓ Optimization complete!');
}

main().catch(console.error);
