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

  static async findSavedByUserId(userId) {
    const result = await query(
      `SELECT o.*, uo.created_at as saved_at 
       FROM outfits o
       JOIN user_outfits uo ON o.id = uo.outfit_id 
       WHERE uo.user_id = $1 
       ORDER BY uo.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  static async saveForUser(userId, outfitId) {
    const check = await query(
      'SELECT id FROM user_outfits WHERE user_id = $1 AND outfit_id = $2',
      [userId, outfitId]
    );
    if (check.rows.length > 0) return check.rows[0];

    const result = await query(
      'INSERT INTO user_outfits (user_id, outfit_id) VALUES ($1, $2) RETURNING *',
      [userId, outfitId]
    );
    return result.rows[0];
  }

  // --- NEW METHODS FOR DATABASE RECOMMENDATIONS ---

  // 1. Personalized Query: Matches Occasion AND Body Type
  static async findByOccasionAndBodyType(occasion, bodyType) {
    const result = await query(
      `SELECT * FROM outfits 
       WHERE occasion = $1 
       AND $2 = ANY(body_types)`, 
      [occasion, bodyType]
    );
    return result.rows;
  }

  // 2. Fallback Query: Matches Occasion Only (Safeguard for missing body type)
  static async findByOccasion(occasion) {
    const result = await query(
      `SELECT * FROM outfits WHERE occasion = $1`, 
      [occasion]
    );
    return result.rows;
  }
}

module.exports = Outfit;