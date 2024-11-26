CREATE TABLE IF NOT EXISTS campaign_recipients (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique pour chaque destinataire
    campaign_id INT NOT NULL,                       -- Référence à la campagne
    email VARCHAR(255) NOT NULL,                    -- Email du destinataire
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Date de création de l'entrée
);
