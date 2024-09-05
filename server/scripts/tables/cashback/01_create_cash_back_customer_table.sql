CREATE TABLE IF NOT EXISTS cashback_customer (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    customer_id INT NOT NULL,                        -- Référence au client disposant de ce cashback
    total_earned DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- Montant total de cashback gagné
    total_spent DECIMAL(10, 2) NOT NULL DEFAULT 0.00,  -- Montant total de cashback dépensé
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
