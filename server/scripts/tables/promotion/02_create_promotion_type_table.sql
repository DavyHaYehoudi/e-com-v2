CREATE TABLE IF NOT EXISTS promotion_type (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque type de promotion
    buy_quantity INT,                             -- Quantité à acheter pour déclencher la promotion
    get_quantity INT,                             -- Quantité obtenue gratuitement
    discount_percentage DECIMAL(5,2) NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),  
    -- Pourcentage de réduction, entre 0 et 100
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création du type de promotion
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
