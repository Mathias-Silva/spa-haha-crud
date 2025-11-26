const pool = require('../config/db');

class Reserva {
    static async create(reservaData) {
        const { user_id, massagem_id, data, horario, pago = false, observacoes } = reservaData;
        const [result] = await pool.execute(
            'INSERT INTO reservas (user_id, massagem_id, data, horario, pago, observacoes) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, massagem_id, data, horario, pago, observacoes || null]
        );
        return { id: result.insertId, user_id, massagem_id, data, horario, pago };
    }

    static async findByUserId(userId) {
        const [rows] = await pool.execute(
            `SELECT r.*, m.nome as massagem_nome, m.preco as massagem_preco, m.descricao as massagem_descricao
             FROM reservas r
             INNER JOIN massagens m ON r.massagem_id = m.id
             WHERE r.user_id = ?
             ORDER BY r.data DESC, r.horario DESC`,
            [userId]
        );
        return rows.map(row => ({
            id: row.id,
            _id: row.id.toString(),
            user: { id: row.user_id },
            massagem: {
                _id: row.massagem_id.toString(),
                nome: row.massagem_nome,
                preco: parseFloat(row.massagem_preco),
                descricao: row.massagem_descricao
            },
            data: row.data,
            horario: row.horario,
            pago: row.pago ? true : false,
            observacoes: row.observacoes
        }));
    }

    static async findAll() {
        const [rows] = await pool.execute(
            `SELECT r.*, 
                    u.id as user_id, u.nome as user_nome, u.email as user_email,
                    m.id as massagem_id, m.nome as massagem_nome, m.preco as massagem_preco, m.descricao as massagem_descricao
             FROM reservas r
             INNER JOIN users u ON r.user_id = u.id
             INNER JOIN massagens m ON r.massagem_id = m.id
             ORDER BY r.data DESC, r.horario DESC`
        );
        return rows.map(row => ({
            id: row.id,
            _id: row.id.toString(),
            user: {
                _id: row.user_id.toString(),
                id: row.user_id,
                nome: row.user_nome,
                email: row.user_email
            },
            massagem: {
                _id: row.massagem_id.toString(),
                id: row.massagem_id,
                nome: row.massagem_nome,
                preco: parseFloat(row.massagem_preco),
                descricao: row.massagem_descricao
            },
            data: row.data,
            horario: row.horario,
            pago: row.pago ? true : false,
            observacoes: row.observacoes
        }));
    }

    static async findById(id) {
        const [rows] = await pool.execute(
            `SELECT r.*, 
                    u.id as user_id, u.nome as user_nome, u.email as user_email,
                    m.id as massagem_id, m.nome as massagem_nome, m.preco as massagem_preco, m.descricao as massagem_descricao
             FROM reservas r
             INNER JOIN users u ON r.user_id = u.id
             INNER JOIN massagens m ON r.massagem_id = m.id
             WHERE r.id = ?`,
            [id]
        );
        if (rows.length === 0) return null;
        const row = rows[0];
        return {
            id: row.id,
            _id: row.id.toString(),
            user: {
                _id: row.user_id.toString(),
                id: row.user_id,
                nome: row.user_nome,
                email: row.user_email
            },
            massagem: {
                _id: row.massagem_id.toString(),
                id: row.massagem_id,
                nome: row.massagem_nome,
                preco: parseFloat(row.massagem_preco),
                descricao: row.massagem_descricao
            },
            data: row.data,
            horario: row.horario,
            pago: row.pago ? true : false,
            observacoes: row.observacoes
        };
    }

    static async delete(id) {
        const [result] = await pool.execute(
            'DELETE FROM reservas WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Reserva;
