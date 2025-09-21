const { query } = require('../config/database');

class BodyMeasurement {
  static async create({ userId, shoulder, bust, waist, hips, height, weight, bodyType }) {
    const result = await query(
      `INSERT INTO body_measurements 
       (user_id, shoulder_width, bust, waist, hips, height, weight, body_type) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, shoulder, bust, waist, hips, height, weight, bodyType]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await query(
      'SELECT * FROM body_measurements WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    return result.rows[0];
  }
}

module.exports = BodyMeasurement;