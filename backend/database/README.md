# Scripts MySQL - Banco de Dados dbSpa

Este diretório contém os scripts SQL para gerenciar o banco de dados do sistema Spa Haha.

## 📋 Scripts Disponíveis

### 1. `create_database.sql`
**Cria o banco de dados e todas as tabelas**

```bash
mysql -u root -p < database/create_database.sql
```

Ou execute diretamente no MySQL:
```sql
source database/create_database.sql
```

**O que faz:**
- Cria o banco `dbSpa` (se não existir)
- Cria as tabelas: `users`, `massagens`, `reservas`
- Configura índices e chaves estrangeiras

---

### 2. `seed.sql`
**Insere dados iniciais no banco**

```bash
mysql -u root -p dbSpa < database/seed.sql
```

**O que faz:**
- Insere um usuário administrador padrão
- Insere tipos de massagem de exemplo
- Útil para testes e desenvolvimento

**⚠️ Nota:** O hash da senha do admin precisa ser gerado. Use:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('sua_senha', 10).then(h => console.log(h));"
```

---

### 3. `reset_database.sql`
**Remove tudo e recria o banco do zero**

```bash
mysql -u root -p < database/reset_database.sql
```

**⚠️ ATENÇÃO:** Este script apaga TODOS os dados!

**O que faz:**
- Remove o banco `dbSpa` completamente
- Recria o banco e todas as tabelas
- Insere dados iniciais

---

### 4. `drop_tables.sql`
**Remove apenas as tabelas (mantém o banco)**

```bash
mysql -u root -p dbSpa < database/drop_tables.sql
```

**⚠️ ATENÇÃO:** Remove todas as tabelas e dados!

**O que faz:**
- Remove as tabelas: `reservas`, `massagens`, `users`
- Mantém o banco `dbSpa` existente

---

## 🚀 Início Rápido

### Opção 1: Criar banco completo (recomendado)
```bash
mysql -u root -p < database/reset_database.sql
```

### Opção 2: Criar passo a passo
```bash
# 1. Criar banco e tabelas
mysql -u root -p < database/create_database.sql

# 2. Inserir dados iniciais (opcional)
mysql -u root -p dbSpa < database/seed.sql
```

---

## 📊 Estrutura das Tabelas

### `users`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nome` (VARCHAR(255))
- `email` (VARCHAR(255), UNIQUE)
- `senha` (VARCHAR(255)) - Hash bcrypt
- `admin` (BOOLEAN, DEFAULT FALSE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `massagens`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nome` (VARCHAR(255), UNIQUE)
- `preco` (DECIMAL(10, 2))
- `descricao` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `reservas`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `user_id` (INT, FOREIGN KEY → users.id)
- `massagem_id` (INT, FOREIGN KEY → massagens.id)
- `data` (DATE)
- `horario` (VARCHAR(10))
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

## 🔐 Credenciais Padrão

**Banco de Dados:**
- Host: `localhost`
- Usuário: `root`
- Senha: `P@$$w0rd`
- Banco: `dbSpa`

**Usuário Admin (após seed):**
- Email: `admin@spahaha.com`
- Senha: `admin123` (ou a senha que você configurou)

---

## 🛠️ Comandos Úteis

### Verificar se o banco existe
```sql
SHOW DATABASES LIKE 'dbSpa';
```

### Ver todas as tabelas
```sql
USE dbSpa;
SHOW TABLES;
```

### Ver estrutura de uma tabela
```sql
DESCRIBE users;
DESCRIBE massagens;
DESCRIBE reservas;
```

### Ver dados de uma tabela
```sql
SELECT * FROM users;
SELECT * FROM massagens;
SELECT * FROM reservas;
```

### Contar registros
```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM massagens;
SELECT COUNT(*) FROM reservas;
```

---

## ⚠️ Troubleshooting

### Erro: "Access denied for user"
- Verifique se está usando o usuário correto (`root`)
- Verifique se a senha está correta (`P@$$w0rd`)

### Erro: "Database dbSpa already exists"
- Use `reset_database.sql` para recriar
- Ou use `DROP DATABASE dbSpa;` antes de executar `create_database.sql`

### Erro: "Table already exists"
- Execute `drop_tables.sql` primeiro
- Ou use `reset_database.sql` para recriar tudo

### Erro de Foreign Key
- Certifique-se de criar as tabelas na ordem correta
- Use `reset_database.sql` que já faz isso corretamente

---

## 📝 Notas

- Todos os scripts usam `IF NOT EXISTS` para evitar erros
- As chaves estrangeiras usam `ON DELETE CASCADE` para manter integridade
- Os índices foram otimizados para melhor performance
- O charset `utf8mb4` suporta emojis e caracteres especiais

