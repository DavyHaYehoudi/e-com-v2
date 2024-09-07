CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    role ENUM('admin', 'customer') DEFAULT 'customer',          -- Rôle de l'utilisateur (admin ou customer)
    first_name VARCHAR(50) NULL,                  -- Prénom
    last_name VARCHAR(50) NULL,                   -- Nom de famille
    email VARCHAR(255) NOT NULL UNIQUE,               -- Email (unique)
    customer_address_shipping_id INT,                  -- Référence à la table customer_address_shipping
    customer_address_billing_id INT,                   -- Référence à la table customer_address_billing
    phone VARCHAR(20),                                -- Numéro de téléphone
    avatar_url VARCHAR(255),                          -- URL de l'avatar
    notes_admin TEXT,                                -- Notes ou commentaires
    email_marketing_consent BOOLEAN DEFAULT FALSE,    -- Consentement pour le marketing par email
    orders_count INT DEFAULT 0,                       -- Nombre de commandes passées
    birthday DATE,                                   -- Date d'anniversaire
    cart_id INT,                                     -- Référence à la table cart
    wishlist_id INT,                                 -- Référence à la table wishlist
    is_active BOOLEAN DEFAULT TRUE,                   -- Actif ou inactif
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date et heure de dernière mise à jour
);
