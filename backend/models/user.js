const pool = require('../config/db');

class User {
    static async create(userData) {
        const { nome, email, senha, admin = false, endereco, numero, complemento } = userData;
        const [result] = await pool.execute(
            'INSERT INTO users (nome, email, senha, admin, endereco, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, email, senha, admin, endereco || null, numero || null, complemento || null]
        );
        return { id: result.insertId, nome, email, admin };
    }

    static async findByEmail(email) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    }

    static async findById(id) {
        const [rows] = await pool.execute(
            'SELECT id, nome, email, admin FROM users WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    static async findByIdWithPassword(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }
}

module.exports = User;
