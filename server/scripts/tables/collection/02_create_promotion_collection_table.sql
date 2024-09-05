CREATE TABLE IF NOT EXISTS promotion_collection (
    collection_id INT NOT NULL,                    -- Référence à la collection
    promotion_id INT NOT NULL,                     -- Référence à la promotion
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la liaison
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Date de dernière mise à jour
    PRIMARY KEY (collection_id, promotion_id) -- Clé primaire composite
);
