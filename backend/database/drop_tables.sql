-- ============================================
-- Script para Remover Todas as Tabelas
-- ============================================
-- ATENÇÃO: Este script remove TODAS as tabelas e dados!
-- Use apenas em desenvolvimento ou quando necessário resetar o banco
-- mysql -u root -p dbSpa < database/drop_tables.sql
-- ============================================

USE dbSpa;

-- Desabilitar verificação de chaves estrangeiras temporariamente
SET FOREIGN_KEY_CHECKS = 0;

-- Remover tabelas (na ordem correta devido às foreign keys)
DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS massagens;
DROP TABLE IF EXISTS users;

-- Reabilitar verificação de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 1;

SELECT 'Tabelas removidas com sucesso!' AS Status;

