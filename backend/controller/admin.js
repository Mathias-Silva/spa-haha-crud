const express = require('express');
const router = express.Router();
const Massagem = require('../repository/massagem');
const { admin } = require('../config/authMiddleware');

// Criando massagem
router.post('/massagens', admin, async (req, res) => {
    try {
        const { nome, preco, descricao } = req.body;
        
        // Validações
        if (!nome || !preco || !descricao) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({ message: 'Preço deve ser um número positivo.' });
        }

        const massagem = await Massagem.create({ nome, preco, descricao });
        const massagemCompleta = await Massagem.findById(massagem.id);
        res.status(201).json(massagemCompleta);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Já existe uma massagem com este nome.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Listar todas as massagens
router.get('/massagens', async (req, res) => {
    try {
        const massagens = await Massagem.findAll();
        res.json(massagens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Buscar massagem por ID
router.get('/massagens/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const massagem = await Massagem.findById(id);
        if (!massagem) return res.status(404).json({ message: 'Massagem não encontrada' });
        res.json(massagem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Atualizar massagem
router.put('/massagens/:id', admin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        const { preco } = req.body;
        
        if (preco !== undefined && (typeof preco !== 'number' || preco <= 0)) {
            return res.status(400).json({ message: 'Preço deve ser um número positivo.' });
        }

        const massagem = await Massagem.update(id, req.body);
        if (!massagem) return res.status(404).json({ message: 'Massagem não encontrada' });
        res.json(massagem);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Já existe uma massagem com este nome.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Deletar massagem
router.delete('/massagens/:id', admin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const deleted = await Massagem.delete(id);
        if (!deleted) return res.status(404).json({ message: 'Massagem não encontrada' });
        res.json({ message: 'Massagem removida com sucesso' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;