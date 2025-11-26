-- ============================================
-- Script Completo: Resetar Banco de Dados
-- ============================================
-- Este script remove todas as tabelas e recria o banco do zero
-- ATENÇÃO: Todos os dados serão perdidos!
-- mysql -u root -p < database/reset_database.sql
-- ============================================

-- Remover banco de dados se existir
DROP DATABASE IF EXISTS dbSpa;

-- Criar banco de dados
CREATE DATABASE dbSpa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Selecionar o banco de dados
USE dbSpa;

-- ============================================
-- Tabela de Usuários
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    endereco VARCHAR(255) NULL,
    numero VARCHAR(20) NULL,
    complemento VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_admin (admin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela de Massagens
-- ============================================
CREATE TABLE massagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nome (nome),
    INDEX idx_preco (preco)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela de Reservas
-- ============================================
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    massagem_id INT NOT NULL,
    data DATE NOT NULL,
    horario VARCHAR(10) NOT NULL,
    pago BOOLEAN DEFAULT FALSE,
    observacoes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (massagem_id) REFERENCES massagens(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_massagem (massagem_id),
    INDEX idx_data (data),
    INDEX idx_data_horario (data, horario),
    INDEX idx_pago (pago),
    UNIQUE KEY unique_reserva (user_id, data, horario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Inserir Dados Iniciais
-- ============================================

-- Usuário Administrador (senha: admin123)
-- Para gerar um novo hash: node database/generate_password_hash.js [senha]
INSERT INTO users (nome, email, senha, admin) VALUES
('Administrador', 'admin@spahaha.com', '$2b$10$zKbGUjS/enWI58Fy5wfJl.ByTCS2msQP2hYbEpMcpNkie95iALj1.', TRUE);

-- Tipos de Massagem
INSERT INTO massagens (nome, preco, descricao) VALUES
('Massagem Relaxante', 120.00, 'Massagem suave e relaxante para alívio do estresse e tensão muscular. Ideal para quem busca bem-estar e tranquilidade.'),
('Massagem Terapêutica', 150.00, 'Massagem focada no tratamento de dores e tensões musculares. Técnicas específicas para alívio de desconfortos.'),
('Massagem Desportiva', 180.00, 'Massagem especializada para atletas, focada na recuperação muscular e prevenção de lesões.'),
('Massagem Modeladora', 200.00, 'Massagem estética para definição corporal e redução de medidas. Combina técnicas de drenagem e modelagem.');

-- ============================================
-- Mensagem de Sucesso
-- ============================================
SELECT 'Banco de dados dbSpa criado e populado com sucesso!' AS Status;
SELECT 'Tabelas criadas: users, massagens, reservas' AS Tabelas;
SELECT COUNT(*) AS TotalUsuarios FROM users;
SELECT COUNT(*) AS TotalMassagens FROM massagens;

