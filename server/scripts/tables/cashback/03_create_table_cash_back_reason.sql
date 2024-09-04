CREATE TABLE IF NOT EXISTS cash_back_reason (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    label ENUM('Loyalty', 'Birthday', 'Review', 'Referral', 'Order', 'Other') NOT NULL, -- Raison du cashback
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
