CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique pour chaque produit
    name VARCHAR(255) NOT NULL,                       -- Nom du produit
    parent_product_id INT NULL,                       -- Référence à un produit parent (si ce produit est une variante)
    SKU VARCHAR(100) NULL UNIQUE,                 -- SKU (Stock Keeping Unit), identifiant unique pour le produit
    description TEXT,                                 -- Description du produit
    weight DECIMAL(10, 2) NULL,                       -- Poids du produit
    continue_selling BOOLEAN DEFAULT TRUE,            -- Indique si le produit peut continuer à être vendu même en rupture de stock
    quantity_in_stock INT UNSIGNED DEFAULT 0,         -- Quantité de produit disponible à la vente
    price DECIMAL(10, 2) NOT NULL,                    -- Prix actuel du produit
    comparate_at_price DECIMAL(10, 2) NULL,           -- Ancien prix du produit (pour les promotions)
    new_until DATE NULL,                              -- Date jusqu'à laquelle le produit est considéré comme nouveau
    is_published BOOLEAN DEFAULT TRUE,                -- Indique si le produit est publié à la vente
    is_star BOOLEAN DEFAULT FALSE,                    -- Indique si le produit est mis en avant à la vente
    is_archived BOOLEAN DEFAULT FALSE,                -- Indique si le produit est archivé (plus disponible à la vente)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création de l'enregistrement
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
