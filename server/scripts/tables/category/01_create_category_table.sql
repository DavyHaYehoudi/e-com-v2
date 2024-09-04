CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque category
    name VARCHAR(255) NOT NULL,                   -- Nom de la category
    image_url VARCHAR(255),                       -- URL de l'image associée à la category
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la category
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);