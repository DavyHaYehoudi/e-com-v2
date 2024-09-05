CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique
    quantity INT NOT NULL DEFAULT 0,                -- Nombre d'articles dans la wishlist
    adding_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date d'ajout de l'article à la wishlist
    product_id INT NULL,                                  -- Référence à la table product
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);

