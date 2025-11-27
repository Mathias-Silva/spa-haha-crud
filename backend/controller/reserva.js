const express = require('express');
const router = express.Router();
const Reserva = require('../repository/reserva');
const { auth, admin } = require('../config/authMiddleware');

// Criar reserva (usuário logado)
router.post('/', auth, async (req, res) => {
    try {
        const { massagem, data, horario, observacoes } = req.body;
        
        // Validações
        if (!massagem || !data || !horario) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Validar se a data não é no passado
        const dataReserva = new Date(data);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        if (dataReserva < hoje) {
            return res.status(400).json({ message: 'Não é possível reservar para datas passadas.' });
        }

        // Validar horário
        const horariosValidos = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        if (!horariosValidos.includes(horario)) {
            return res.status(400).json({ message: 'Horário inválido.' });
        }

        const reserva = await Reserva.create({
            user_id: req.user.id,
            massagem_id: parseInt(massagem),
            data: dataReserva.toISOString().split('T')[0],
            horario: horario,
            pago: false,
            observacoes: observacoes || null
        });
        
        const reservaCompleta = await Reserva.findById(reserva.id);
        res.status(201).json(reservaCompleta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Listar reservas do usuário logado
router.get('/minhas', auth, async (req, res) => {
    try {
        const reservas = await Reserva.findByUserId(req.user.id);
        res.json(reservas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar todas as reservas (admin)
router.get('/', admin, async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.json(reservas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Atualizar status de pagamento (admin)
router.patch('/:id/pagamento', admin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { pago } = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        const pool = require('../config/db');
        await pool.execute(
            'UPDATE reservas SET pago = ? WHERE id = ?',
            [pago ? true : false, id]
        );

        const reserva = await Reserva.findById(id);
        if (!reserva) return res.status(404).json({ message: 'Reserva não encontrada.' });
        
        res.json(reserva);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deletar reserva (admin)
router.delete('/:id', admin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const deleted = await Reserva.delete(id);
        if (!deleted) return res.status(404).json({ message: 'Reserva não encontrada.' });
        res.json({ message: 'Reserva removida com sucesso.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
