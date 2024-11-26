CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- Identifiant unique du panier
    customer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Date de création du panier
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);

