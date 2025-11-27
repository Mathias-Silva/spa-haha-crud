# Backend - Spa Haha CRUD

## Configuração do Banco de Dados MySQL

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar MySQL

Certifique-se de que o MySQL está instalado.

### 3. Criar o banco de dados

Execute o script SQL para criar o banco e as tabelas:

```bash
mysql -u root -p < database/schema.sql
```

Ou execute manualmente no MySQL:
```sql
CREATE DATABASE IF NOT EXISTS dbSpa;
USE dbSpa;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_admin (admin)
);

-- Tabela de massagens
CREATE TABLE IF NOT EXISTS massagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nome (nome),
    INDEX idx_preco (preco)
) ;

-- Tabela de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    massagem_id INT NOT NULL,
    data DATE NOT NULL,
    horario VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (massagem_id) REFERENCES massagens(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_massagem (massagem_id),
    INDEX idx_data (data),
    INDEX idx_data_horario (data, horario),
    UNIQUE KEY unique_reserva (user_id, data, horario)
) ;


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

