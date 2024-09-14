CREATE TABLE IF NOT EXISTS product_image (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique pour chaque image
    url VARCHAR(255) NOT NULL,                        -- URL de l'image
    is_main BOOLEAN DEFAULT FALSE,                    -- Indique si c'est l'image principale du produit
    product_id INT NOT NULL,                          -- Référence au produit associé
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création de l'enregistrement
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Date et heure de dernière mise à jour
    
    -- Index pour améliorer les performances de requêtes sur product_id
    INDEX idx_product_id (product_id)
);
