CREATE TABLE IF NOT EXISTS `order_gift_card` (
    id INT AUTO_INCREMENT PRIMARY KEY,                        -- Identifiant unique de la commande
    gift_card_usage_id INT NULL,                             -- Référence aux usages de la gift card utilisée
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,           -- Date de création de la commande
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de mise à jour de la commande
);
