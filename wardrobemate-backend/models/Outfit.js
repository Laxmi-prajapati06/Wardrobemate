const { query } = require('../config/db');

class Outfit {
  static async findByBodyType(bodyType) {
    const result = await query(
      'SELECT * FROM outfits WHERE $1 = ANY(body_type)',
      [bodyType]
    );
    return result.rows;
  }

  static async findByColor(undertone) {
    const result = await query(
      'SELECT * FROM outfits WHERE $1 = ANY(recommended_colors)',
      [undertone]
    );
    return result.rows;
  }

  static async findByOccasion(occasionId) {
    const result = await query(
      'SELECT * FROM outfits WHERE occasion_id = $1',
      [occasionId]
    );
    return result.rows;
  }
}

module.exports = Outfit;