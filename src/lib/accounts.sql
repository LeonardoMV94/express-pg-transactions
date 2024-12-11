-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() 
);
 
-- Tabla de cuentas
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    balance NUMERIC(10, 2) DEFAULT 0 CHECK (balance >= 0),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 
-- Tabla de transferencias
CREATE TABLE transfers (
    id SERIAL PRIMARY KEY,
    origin_account_id INT NOT NULL,
    destiny_account_id INT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    transfer_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR (20) DEFAULT 'completed',
    FOREIGN KEY (origin_account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (destiny_account_id) REFERENCES accounts(id) ON DELETE CASCADE
);