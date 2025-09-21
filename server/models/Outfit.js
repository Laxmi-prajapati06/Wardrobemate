const { query } = require('../config/database');

class Outfit {
  static async findByIds(ids) {
    if (!ids || ids.length === 0) return [];
    
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(',');
    const result = await query(
      `SELECT * FROM outfits WHERE id IN (${placeholders})`,
      ids
    );
    return result.rows;
  }

  static async findByColorsAndIds(ids, colors) {
    if (!ids || ids.length === 0) return [];
    if (!colors || colors.length === 0) return this.findByIds(ids);
    
    const idPlaceholders = ids.map((_, i) => `$${i + 1}`).join(',');
    const colorPlaceholders = colors.map((_, i) => `$${ids.length + i + 1}`).join(',');
    
    const result = await query(
      `SELECT * FROM outfits 
       WHERE id IN (${idPlaceholders}) 
       AND colors && ARRAY[${colorPlaceholders}]`,
      [...ids, ...colors]
    );
    return result.rows;
  }

  static async saveForUser(userId, outfitId) {
    const result = await query(
      'INSERT INTO user_outfits (user_id, outfit_id) VALUES ($1, $2) RETURNING *',
      [userId, outfitId]
    );
    return result.rows[0];
  }
}

module.exports = Outfit;