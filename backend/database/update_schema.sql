-- ============================================
-- Script de Atualização do Schema
-- Adiciona campos de endereço e pagamento
-- ============================================
-- Execute após criar o banco inicial
-- mysql -u root -p dbSpa < database/update_schema.sql
-- ============================================

USE dbSpa;

-- Adicionar campos de endereço na tabela users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS endereco VARCHAR(255) NULL AFTER senha,
ADD COLUMN IF NOT EXISTS numero VARCHAR(20) NULL AFTER endereco,
ADD COLUMN IF NOT EXISTS complemento VARCHAR(255) NULL AFTER numero;

-- Adicionar campo de pagamento na tabela reservas
ALTER TABLE reservas 
ADD COLUMN IF NOT EXISTS pago BOOLEAN DEFAULT FALSE AFTER horario,
ADD COLUMN IF NOT EXISTS observacoes TEXT NULL AFTER pago;

-- Criar índice para busca por status de pagamento
CREATE INDEX IF NOT EXISTS idx_pago ON reservas(pago);

SELECT 'Schema atualizado com sucesso!' AS Status;

