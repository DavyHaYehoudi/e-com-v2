CREATE TABLE IF NOT EXISTS campaign (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique de la campagne
    subject VARCHAR(255) NOT NULL,                    -- Sujet de l'e-mail marketing
    content TEXT NOT NULL,                            -- Contenu HTML de l'e-mail marketing
    send_date TIMESTAMP NULL DEFAULT NULL,            -- Date d'envoi
    status ENUM('prepared', 'sent') DEFAULT 'prepared',     -- Statut de la campagne (preparée, envoyée)
    total_sent INT DEFAULT 0,                         -- Nombre total d'e-mails envoyés
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date de création de la campagne
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Dernière mise à jour
);
