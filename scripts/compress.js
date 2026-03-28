const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FRAMES_DIR = path.join(__dirname, '../public/images/hero section images frame');
const PROJECT_DIR = path.join(__dirname, '../public/images');

async function processFrames() {
  if (fs.existsSync(FRAMES_DIR)) {
    const files = fs.readdirSync(FRAMES_DIR).filter(f => f.endsWith('.jpg'));
    console.log(`Found ${files.length} frames to convert...`);
    
    for (const file of files) {
      const inputPath = path.join(FRAMES_DIR, file);
      const outputPath = path.join(FRAMES_DIR, file.replace('.jpg', '.webp'));
      
      await sharp(inputPath)
        .webp({ quality: 70 })
        .toFile(outputPath);
        
      fs.unlinkSync(inputPath); // remove original to save space
      console.log(`Converted ${file} to ${path.basename(outputPath)}`);
    }
  }

  // Optimize project imagery
  const projectImages = ['project-shl.webp', 'project-shield.webp', 'project-agritake.webp'];
  for (const img of projectImages) {
    const imgPath = path.join(PROJECT_DIR, img);
    if (fs.existsSync(imgPath)) {
      const tempPath = path.join(PROJECT_DIR, `temp-${img}`);
      // Using avif or webp with higher compression
      await sharp(imgPath).webp({ quality: 70 }).toFile(tempPath);
      fs.unlinkSync(imgPath);
      fs.renameSync(tempPath, imgPath);
      console.log(`Compressed project image: ${img}`);
    }
  }
}

processFrames()
  .then(() => console.log('✅ Image compression complete.'))
  .catch(err => console.error('Error compressing images:', err));
