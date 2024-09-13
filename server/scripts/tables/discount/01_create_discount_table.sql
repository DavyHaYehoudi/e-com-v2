CREATE TABLE IF NOT EXISTS discount (
    id INT AUTO_INCREMENT PRIMARY KEY,
    target_id INT NOT NULL,                            -- Référence à l'ID de la collection, catégorie ou produit
    target_table ENUM('collection', 'category', 'product') NOT NULL,  -- Type de cible (collection, catégorie, produit)
    discount_percentage DECIMAL(5, 2) NOT NULL,        -- Pourcentage de réduction
    start_date DATE NOT NULL,                          -- Date de début de la promotion
    end_date DATE NOT NULL,                            -- Date de fin de la promotion
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Date de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de mise à jour
);
