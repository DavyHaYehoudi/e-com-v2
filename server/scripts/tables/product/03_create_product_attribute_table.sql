CREATE TABLE IF NOT EXISTS product_attribute (
    product_id INT NOT NULL,                      -- Référence au produit
    attribute_value_id INT NOT NULL,              -- Référence à la valeur d'attribut spécifique

    PRIMARY KEY (product_id, attribute_value_id), -- Clé primaire composite pour éviter les doublons
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de l'association
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Date de dernière mise à jour

);
