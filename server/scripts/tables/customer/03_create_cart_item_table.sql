CREATE TABLE IF NOT EXISTS cart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique de l'article dans le panier
    cart_id INT,                                      -- Référence au panier (relation cart)
    product_id INT,                                   -- Référence au produit (relation product)
    quantity INT NOT NULL DEFAULT 0,                  -- Quantité de l'article dans le panier
    adding_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Date d'ajout de l'article
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);