const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

require('./config/db');

app.get('/', (req, res) => {
    res.send('API do Spa Haha rodando com Node.js e Express.');
});

const authRoutes = require('./controller/auth');
const adminRoutes = require('./controller/admin');
const reservaRoutes = require('./controller/reserva');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/reserva', reservaRoutes);
// ------------------------

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(` Servidor rodando na porta ${PORT}`);
    console.log(` Link Local: http://localhost:${PORT}`);
});