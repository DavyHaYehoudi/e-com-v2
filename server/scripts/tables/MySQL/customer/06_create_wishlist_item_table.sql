CREATE TABLE IF NOT EXISTS wishlist_item (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique de l'article dans le panier
    wishlist_id INT,                                      -- Référence à la wishlist (relation wishlist)
    product_id INT,                                   -- Référence au produit (relation product)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Date de création du panier
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);