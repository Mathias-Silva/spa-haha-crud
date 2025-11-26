# Backend - Spa Haha CRUD

## Configuração do Banco de Dados MySQL

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar MySQL

Certifique-se de que o MySQL está instalado e rodando.

### 3. Criar o banco de dados

Execute o script SQL para criar o banco e as tabelas:

```bash
mysql -u root -p < database/schema.sql
```

Ou execute manualmente no MySQL:
```sql
CREATE DATABASE IF NOT EXISTS dbSpa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dbSpa;
-- Copie e cole o conteúdo do arquivo database/schema.sql
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend` com:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=P@$$w0rd
DB_NAME=dbSpa
JWT_SECRET=segredo123
PORT=3000
```

### 5. Executar o servidor

```bash
npm start
```

ou em modo desenvolvimento:

```bash
npm run dev
```

## Estrutura do Banco de Dados

- **users**: Usuários do sistema (clientes e administradores)
- **massagens**: Tipos de massagem disponíveis
- **reservas**: Reservas realizadas pelos usuários

## Endpoints

### Autenticação (`/auth`)
- `POST /auth/register` - Cadastrar novo usuário
- `POST /auth/login` - Fazer login

### Admin (`/admin`)
- `GET /admin/massagens` - Listar todas as massagens
- `GET /admin/massagens/:id` - Buscar massagem por ID
- `POST /admin/massagens` - Criar massagem (admin)
- `PUT /admin/massagens/:id` - Atualizar massagem (admin)
- `DELETE /admin/massagens/:id` - Deletar massagem (admin)

### Reservas (`/reserva`)
- `POST /reserva` - Criar reserva (usuário logado)
- `GET /reserva/minhas` - Listar minhas reservas (usuário logado)
- `GET /reserva` - Listar todas as reservas (admin)
- `DELETE /reserva/:id` - Deletar reserva (admin)

