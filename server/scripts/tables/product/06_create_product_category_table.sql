CREATE TABLE IF NOT EXISTS product_category (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque association produit-catégorie
    product_id INT NOT NULL,                      -- Référence au produit
    category_id INT NOT NULL,                     -- Référence à la catégorie
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de l'association
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Date de dernière mise à jour
);
