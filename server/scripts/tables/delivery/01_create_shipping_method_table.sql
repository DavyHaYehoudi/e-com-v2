CREATE TABLE IF NOT EXISTS shipping_method (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque méthode de livraison
    name VARCHAR(255) NOT NULL,                   -- Nom de la méthode de livraison
    is_active BOOLEAN DEFAULT TRUE,               -- Indique si la méthode de livraison est active
    is_default BOOLEAN DEFAULT FALSE,
    icon_url VARCHAR(255),                        -- URL de l'image représentant l'icône du service de livraison
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la méthode de livraison
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
