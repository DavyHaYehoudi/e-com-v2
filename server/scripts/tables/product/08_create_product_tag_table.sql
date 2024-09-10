CREATE TABLE IF NOT EXISTS product_tag (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque association produit-tag
    product_id INT NOT NULL,                      -- Référence au produit
    tag_id INT NOT NULL,                     -- Référence au tag
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de l'association
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);