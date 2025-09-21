const { query } = require('../config/database');

class User {
  static async create({ name, email, password }) {
    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, password]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, { name }) {
    const result = await query(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email, created_at',
      [name, id]
    );
    return result.rows[0];
  }
}

module.exports = User;