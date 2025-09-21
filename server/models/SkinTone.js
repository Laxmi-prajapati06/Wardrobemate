const { query } = require('../config/database');

class SkinTone {
  static async create({ userId, skinTone, dominantColors, imagePath }) {
    const result = await query(
      `INSERT INTO skin_tones (user_id, skin_tone, dominant_colors, image_path) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, skinTone, dominantColors, imagePath]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await query(
      'SELECT * FROM skin_tones WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    return result.rows[0];
  }
}

module.exports = SkinTone;