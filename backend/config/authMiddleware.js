const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'segredo123';

function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido.' });
    }
}

function admin(req, res, next) {
    // Primeiro verifica autenticação
    auth(req, res, () => {
        // Se chegou aqui, o usuário está autenticado
        if (req.user && req.user.admin) {
            next();
        } else {
            res.status(403).json({ message: 'Acesso restrito para administradores.' });
        }
    });
}

module.exports = { auth, admin };