CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique
    customer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);

