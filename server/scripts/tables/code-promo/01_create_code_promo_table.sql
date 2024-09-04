CREATE TABLE IF NOT EXISTS code_promo (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque code promo
    code VARCHAR(255) NOT NULL,                   -- Code alphanumérique de la promotion, ex: 'Bonjour-10'
    discount_percentage DECIMAL(5,2) NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),  
    -- Pourcentage de réduction, entre 0 et 100
    start_date DATE NOT NULL,                     -- Date de début de validité du code promo
    end_date DATE NOT NULL,                       -- Date de fin de validité du code promo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création du code promo
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
