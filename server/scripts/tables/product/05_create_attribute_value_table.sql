CREATE TABLE IF NOT EXISTS attribute_value (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque valeur d'attribut
    attribute_id INT NOT NULL,                    -- Référence à l'attribut auquel cette valeur appartient
    value VARCHAR(100) NOT NULL,                  -- Valeur de l'attribut (par exemple, 'S', 'M', 'blue')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la valeur d'attribut
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
