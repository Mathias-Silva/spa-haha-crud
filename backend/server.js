const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// --- Middlewares Essenciais ---
// Habilita o CORS para que o Angular (frontend) possa acessar a API
app.use(cors());

// Body parser para interpretar JSON nas requisições
app.use(express.json());
// -----------------------------

// --- Conexão com o MySQL ---
// A conexão é testada automaticamente no arquivo config/db.js
require('./config/db');
// -----------------------------

// --- Rotas de Exemplo ---
app.get('/', (req, res) => {
    res.send('API do Spa Haha rodando com Node.js e Express.');
});

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const reservaRoutes = require('./routes/reserva');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/reserva', reservaRoutes);
// ------------------------

// --- Início do Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🔗 Link Local: http://localhost:${PORT}`);
});