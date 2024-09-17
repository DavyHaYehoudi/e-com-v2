CREATE TABLE IF NOT EXISTS product_variant (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique pour chaque variant
    combination VARCHAR(255) NULL,                        -- combinaison de variant
    product_id INT NULL,                          -- Référence au produit associé
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création de l'enregistrement
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
