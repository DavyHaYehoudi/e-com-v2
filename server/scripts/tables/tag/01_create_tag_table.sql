CREATE TABLE IF NOT EXISTS tag (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque tag
    name VARCHAR(255) NOT NULL,                   -- Nom de la tag
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la tag
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);