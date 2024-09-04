CREATE TABLE IF NOT EXISTS promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque promotion
    headline TEXT NOT NULL,                       -- Texte d'accroche de la promotion
    start_date DATE NOT NULL,                     -- Date de début de la promotion
    end_date DATE NOT NULL,                       -- Date de fin de la promotion
    promotion_type_id INT NOT NULL,               -- Référence au type de promotion
    is_stackable BOOLEAN DEFAULT FALSE,           -- Indique si la promotion est cumulable avec d'autres
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la promotion
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
