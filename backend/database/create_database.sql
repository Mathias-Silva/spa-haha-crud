-- ============================================
-- Script de Criação do Banco de Dados dbSpa
-- ============================================
-- Execute este script como usuário root ou com permissões de criação de banco
-- mysql -u root -p < database/create_database.sql
-- ============================================

-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS dbSpa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Selecionar o banco de dados
USE dbSpa;

-- ============================================
-- Tabela de Usuários
-- ============================================
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS massagens (
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
CREATE TABLE IF NOT EXISTS reservas (
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
-- Mensagem de Sucesso
-- ============================================
SELECT 'Banco de dados dbSpa criado com sucesso!' AS Status;
SELECT 'Tabelas criadas: users, massagens, reservas' AS Tabelas;

