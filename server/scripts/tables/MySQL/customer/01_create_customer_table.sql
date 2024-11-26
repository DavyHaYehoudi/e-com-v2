CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    role ENUM('admin', 'customer') DEFAULT 'customer',          -- Rôle de l'utilisateur (admin ou customer)
    first_name VARCHAR(50) NULL,                  -- Prénom
    last_name VARCHAR(50) NULL,                   -- Nom de famille
    email VARCHAR(255) NOT NULL UNIQUE,               -- Email (unique)
    phone VARCHAR(20),                                -- Numéro de téléphone
    avatar_url VARCHAR(255) DEFAULT 'https/server-storage/url',                          -- URL de l'avatar
    email_marketing_consent BOOLEAN DEFAULT FALSE,    -- Consentement pour le marketing par email
    orders_count INT DEFAULT 0,                       -- Nombre de commandes passées
    birthday DATE,                                   -- Date d'anniversaire
    is_active BOOLEAN DEFAULT TRUE,                   -- Actif ou inactif
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date et heure de dernière mise à jour
);
