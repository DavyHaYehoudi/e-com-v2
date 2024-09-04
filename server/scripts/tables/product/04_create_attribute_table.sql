CREATE TABLE IF NOT EXISTS attribute (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque attribut
    name VARCHAR(100) NOT NULL UNIQUE,            -- Nom de l'attribut (par exemple, 'size', 'color')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de l'attribut
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
