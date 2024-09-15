CREATE TABLE IF NOT EXISTS gift_card_usage (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    gift_card_id INT NULL,                       -- Référence à la carte cadeau utilisée
    used_by_customer_id INT NULL,                -- Référence au client qui a utilisé la carte cadeau
    amount_used DECIMAL(10, 2) NOT NULL,             -- Montant dépensé avec la carte cadeau
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Date et heure d'utilisation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
