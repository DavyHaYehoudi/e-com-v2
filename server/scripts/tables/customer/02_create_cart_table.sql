CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique
    quantity INT NOT NULL DEFAULT 0,                -- Nombre d'articles dans le panier
    adding_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date d'ajout de l'article au panier
    product_id INT NULL,                                  -- Référence à la table product
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);


