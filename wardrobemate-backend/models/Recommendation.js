const { query } = require('../config/db');

class Recommendation {
  static async create({ userId, prompt, response }) {
    const result = await query(
      'INSERT INTO ai_recommendations (user_id, prompt, response) VALUES ($1, $2, $3) RETURNING *',
      [userId, prompt, response]
    );
    return result.rows[0];
  }

  static async findByUser(userId) {
    const result = await query(
      'SELECT * FROM ai_recommendations WHERE user_id = $1 ORDER BY generated_at DESC',
      [userId]
    );
    return result.rows;
  }
}

module.exports = Recommendation;