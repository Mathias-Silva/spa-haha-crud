const pool = require('../config/db');

class Massagem {
    static async create(massagemData) {
        const { nome, preco, descricao } = massagemData;
        const [result] = await pool.execute(
            'INSERT INTO massagens (nome, preco, descricao) VALUES (?, ?, ?)',
            [nome, preco, descricao]
        );
        return { id: result.insertId, nome, preco, descricao };
    }

    static async findAll() {
        const [rows] = await pool.execute(
            'SELECT * FROM massagens ORDER BY created_at DESC'
        );
        return rows.map(row => ({
            _id: row.id.toString(),
            id: row.id,
            nome: row.nome,
            preco: parseFloat(row.preco),
            descricao: row.descricao,
            created_at: row.created_at,
            updated_at: row.updated_at
        }));
    }

    static async findById(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM massagens WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return null;
        const row = rows[0];
        return {
            _id: row.id.toString(),
            id: row.id,
            nome: row.nome,
            preco: parseFloat(row.preco),
            descricao: row.descricao,
            created_at: row.created_at,
            updated_at: row.updated_at
        };
    }

    static async update(id, massagemData) {
        const { nome, preco, descricao } = massagemData;
        await pool.execute(
            'UPDATE massagens SET nome = ?, preco = ?, descricao = ? WHERE id = ?',
            [nome, preco, descricao, id]
        );
        return this.findById(id);
    }

    static async delete(id) {
        const [result] = await pool.execute(
            'DELETE FROM massagens WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Massagem;
