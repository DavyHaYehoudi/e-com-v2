CREATE TABLE IF NOT EXISTS product_variant (
    product_id INT NULL,
    parent_product_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création de l'enregistrement
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
