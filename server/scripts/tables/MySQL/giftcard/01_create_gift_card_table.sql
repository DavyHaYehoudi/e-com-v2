CREATE TABLE IF NOT EXISTS gift_card (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    first_holder_id INT,                             -- Référence au détenteur initial 
    code CHAR(12) NOT NULL UNIQUE,                   -- Code de la carte cadeau (12 caractères)
    initial_value DECIMAL(10, 2) NOT NULL,           -- Valeur initiale de la carte cadeau
    balance DECIMAL(10, 2) NOT NULL,                 -- Solde restant sur la carte cadeau
    is_issued_by_admin BOOLEAN DEFAULT FALSE,        -- Indique si la carte est émise par l'admin
    expiration_date DATE,                            -- Date d'expiration de la carte cadeau
    order_id INT,                                    -- Référence à la commande associée (peut être NULL si émis par admin)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
