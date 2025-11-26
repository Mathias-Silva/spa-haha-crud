# 🚀 Guia de Instalação - Banco de Dados MySQL

## Pré-requisitos

- MySQL instalado e rodando
- Acesso com usuário `root` e senha `P@$$w0rd`
- Node.js e npm instalados (para gerar hash de senhas)

---

## 📦 Opção 1: Instalação Rápida (Recomendada)

Execute o script completo que cria tudo de uma vez:

```bash
mysql -u root -pP@$$w0rd < backend/database/reset_database.sql
```

Ou se preferir digitar a senha:

```bash
mysql -u root -p < backend/database/reset_database.sql
```

**O que este script faz:**
- ✅ Remove o banco `dbSpa` se existir
- ✅ Cria o banco `dbSpa` do zero
- ✅ Cria todas as tabelas (users, massagens, reservas)
- ✅ Insere usuário administrador padrão
- ✅ Insere tipos de massagem de exemplo

**Credenciais do Admin criado:**
- Email: `admin@spahaha.com`
- Senha: `admin123`

---

## 📦 Opção 2: Instalação Passo a Passo

### Passo 1: Criar banco e tabelas

```bash
mysql -u root -p < backend/database/create_database.sql
```

### Passo 2: Inserir dados iniciais (opcional)

```bash
mysql -u root -p dbSpa < backend/database/seed.sql
```

---

## 🔧 Verificação

Após executar os scripts, verifique se tudo foi criado corretamente:

```bash
mysql -u root -p dbSpa
```

Dentro do MySQL:

```sql
-- Ver todas as tabelas
SHOW TABLES;

-- Ver estrutura da tabela users
DESCRIBE users;

-- Ver estrutura da tabela massagens
DESCRIBE massagens;

-- Ver estrutura da tabela reservas
DESCRIBE reservas;

-- Verificar dados inseridos
SELECT * FROM users;
SELECT * FROM massagens;

-- Contar registros
SELECT COUNT(*) AS total_usuarios FROM users;
SELECT COUNT(*) AS total_massagens FROM massagens;
```

---

## 🔐 Gerar Hash de Senha

Se precisar criar um novo usuário ou alterar a senha do admin:

```bash
cd backend
node database/generate_password_hash.js sua_senha_aqui
```

Exemplo:
```bash
node database/generate_password_hash.js admin123
```

Isso gerará um hash que você pode usar no SQL:

```sql
INSERT INTO users (nome, email, senha, admin) VALUES
('Novo Admin', 'novo@admin.com', 'HASH_GERADO_AQUI', TRUE);
```

---

## 🗑️ Resetar Banco de Dados

Se precisar recriar tudo do zero:

```bash
mysql -u root -p < backend/database/reset_database.sql
```

**⚠️ ATENÇÃO:** Isso apaga TODOS os dados!

---

## 🗑️ Remover Apenas Tabelas

Se quiser manter o banco mas remover as tabelas:

```bash
mysql -u root -p dbSpa < backend/database/drop_tables.sql
```

Depois recrie com:

```bash
mysql -u root -p dbSpa < backend/database/create_database.sql
```

---

## ⚠️ Troubleshooting

### Erro: "Access denied for user 'root'"

**Solução 1:** Verifique se a senha está correta (`P@$$w0rd`)

**Solução 2:** Se você usa outra senha, edite os comandos:
```bash
mysql -u root -pSUA_SENHA < backend/database/reset_database.sql
```

**Solução 3:** Ou configure no arquivo `.env` do backend:
```env
DB_PASSWORD=sua_senha_aqui
```

### Erro: "Database dbSpa already exists"

**Solução:** Use o script `reset_database.sql` que remove e recria:
```bash
mysql -u root -p < backend/database/reset_database.sql
```

### Erro: "Table already exists"

**Solução:** Remova as tabelas primeiro:
```bash
mysql -u root -p dbSpa < backend/database/drop_tables.sql
```

Depois recrie:
```bash
mysql -u root -p dbSpa < backend/database/create_database.sql
```

### Erro: "Cannot connect to MySQL server"

**Solução:** Verifique se o MySQL está rodando:
```bash
# Windows
net start MySQL80

# Linux/Mac
sudo systemctl start mysql
# ou
sudo service mysql start
```

---

## 📋 Estrutura Final Esperada

Após a instalação, você deve ter:

```
dbSpa
├── users (tabela)
│   └── 1 registro (admin)
├── massagens (tabela)
│   └── 4 registros (tipos de massagem)
└── reservas (tabela)
    └── 0 registros (vazia inicialmente)
```

---

## ✅ Checklist de Instalação

- [ ] MySQL está instalado e rodando
- [ ] Script `reset_database.sql` executado com sucesso
- [ ] Banco `dbSpa` criado
- [ ] Tabelas `users`, `massagens`, `reservas` criadas
- [ ] Usuário admin inserido
- [ ] Tipos de massagem inseridos
- [ ] Backend configurado com credenciais corretas no `.env`

---

## 🎯 Próximos Passos

1. Configure o arquivo `.env` do backend:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=P@$$w0rd
DB_NAME=dbSpa
JWT_SECRET=segredo123
PORT=3000
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Inicie o servidor:
```bash
npm start
```

4. Teste a conexão acessando: `http://localhost:3000`

---

## 📚 Documentação Adicional

- Veja `database/README.md` para mais detalhes sobre os scripts
- Veja `backend/README.md` para documentação da API

