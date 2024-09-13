CREATE TABLE IF NOT EXISTS collection (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque collection
    label VARCHAR(255) NOT NULL,                   -- Nom de la collection
    image_url VARCHAR(255),                       -- URL de l'image associée à la collection
    is_star BOOLEAN,                -- Indique si la collection est mise en avant
    promotion_percentage INT NULL, -- Pourcentage de réduction sur toute la collection
    is_archived BOOLEAN, -- Indique si la collection est archivée
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la collection
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
