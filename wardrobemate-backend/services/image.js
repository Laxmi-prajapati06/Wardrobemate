const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (file, userId) => {
  const uploadDir = path.join(__dirname, '../../uploads');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `user-${userId}-${Date.now()}.jpeg`;
  const filepath = path.join(uploadDir, filename);

  await sharp(file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(filepath);

  return `/uploads/${filename}`;
};

module.exports = { processImage };