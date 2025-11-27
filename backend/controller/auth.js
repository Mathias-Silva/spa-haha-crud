const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../repository/user');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo123';

// Cadastro
router.post('/register', async (req, res) => {
    const { nome, email, senha, endereco, numero, complemento } = req.body;
    try {
        // Validações
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        if (senha.length < 6) {
            return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'E-mail inválido.' });
        }

        const userExists = await User.findByEmail(email);
        if (userExists) return res.status(400).json({ message: 'E-mail já cadastrado.' });

        const hashedPassword = await bcrypt.hash(senha, 10);
        await User.create({ nome, email, senha: hashedPassword, endereco, numero, complemento });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        // Validações
        if (!email || !senha) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }

        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ message: 'E-mail ou senha inválidos.' });

        const valid = await bcrypt.compare(senha, user.senha);
        if (!valid) return res.status(400).json({ message: 'E-mail ou senha inválidos.' });

        const token = jwt.sign({ id: user.id, admin: user.admin }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { nome: user.nome, email: user.email, admin: user.admin } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;