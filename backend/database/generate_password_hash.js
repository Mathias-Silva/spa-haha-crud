// Script para gerar hash de senha
// Uso: node database/generate_password_hash.js [senha]
const bcrypt = require('bcryptjs');

const senha = process.argv[2] || 'admin123';

bcrypt.hash(senha, 10)
    .then(hash => {
        console.log('\n========================================');
        console.log('Hash gerado com sucesso!');
        console.log('========================================');
        console.log('Senha:', senha);
        console.log('Hash:', hash);
        console.log('========================================\n');
    })
    .catch(err => {
        console.error('Erro ao gerar hash:', err.message);
        console.log('\nCertifique-se de que bcryptjs está instalado:');
        console.log('npm install bcryptjs\n');
    });

