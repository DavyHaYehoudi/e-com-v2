CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique pour chaque produit
    name VARCHAR(255) NOT NULL,                       -- Nom du produit
    SKU VARCHAR(100) NULL ,                 -- SKU (Stock Keeping Unit), 
    description TEXT,                                 -- Description du produit
    weight DECIMAL(10, 2) NULL,                       -- Poids du produit
    continue_selling BOOLEAN DEFAULT TRUE,            -- Indique si le produit peut continuer à être vendu même en rupture de stock
    quantity_in_stock INT DEFAULT 0,         -- Quantité de produit disponible à la vente
    price DECIMAL(10, 2) NOT NULL,                    -- Prix actuel du produit
    new_until DATE NULL,                              -- Date jusqu'à laquelle le produit est considéré comme nouveau
    cash_back DECIMAL(10, 2) NULL DEFAULT NULL
    is_published BOOLEAN DEFAULT TRUE,                -- Indique si le produit est publié à la vente
    is_star BOOLEAN DEFAULT FALSE,                    -- Indique si le produit est mis en avant à la vente
    is_archived BOOLEAN DEFAULT FALSE,                -- Indique si le produit est archivé (plus disponible à la vente)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création de l'enregistrement
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
