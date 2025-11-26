-- ============================================
-- Script de Dados Iniciais (Seed)
-- ============================================
-- Este script insere dados de exemplo no banco
-- Execute após criar as tabelas: mysql -u root -p dbSpa < database/seed.sql
-- ============================================

USE dbSpa;

-- ============================================
-- Inserir Usuário Administrador
-- ============================================
-- Senha: admin123 (hash bcrypt)
-- Para gerar novo hash: node database/generate_password_hash.js [senha]
INSERT INTO users (nome, email, senha, admin) VALUES
('Administrador', 'admin@spahaha.com', '$2b$10$zKbGUjS/enWI58Fy5wfJl.ByTCS2msQP2hYbEpMcpNkie95iALj1.', TRUE)
ON DUPLICATE KEY UPDATE nome = nome;

-- ============================================
-- Inserir Tipos de Massagem
-- ============================================
INSERT INTO massagens (nome, preco, descricao) VALUES
('Massagem Relaxante', 120.00, 'Massagem suave e relaxante para alívio do estresse e tensão muscular. Ideal para quem busca bem-estar e tranquilidade.'),
('Massagem Terapêutica', 150.00, 'Massagem focada no tratamento de dores e tensões musculares. Técnicas específicas para alívio de desconfortos.'),
('Massagem Desportiva', 180.00, 'Massagem especializada para atletas, focada na recuperação muscular e prevenção de lesões.'),
('Massagem Modeladora', 200.00, 'Massagem estética para definição corporal e redução de medidas. Combina técnicas de drenagem e modelagem.')
ON DUPLICATE KEY UPDATE nome = nome;

-- ============================================
-- Mensagem de Sucesso
-- ============================================
SELECT 'Dados iniciais inseridos com sucesso!' AS Status;
SELECT COUNT(*) AS TotalUsuarios FROM users;
SELECT COUNT(*) AS TotalMassagens FROM massagens;

