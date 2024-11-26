CREATE TABLE IF NOT EXISTS cash_back_transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,                       -- Identifiant unique
    customer_id INT NOT NULL,                                -- Référence au client concerné par la transaction
    cash_back_earned_for_this_transaction DECIMAL(10, 2) DEFAULT 0.00,  -- Montant de cashback gagné pour cette transaction
    cash_back_spent_for_this_transaction DECIMAL(10, 2) DEFAULT 0.00,   -- Montant de cashback dépensé pour cette transaction
    cash_back_reason_id INT NOT NULL,                        -- Référence à la raison de la transaction
    order_id INT,                                            -- Référence éventuelle à la commande associée (peut être NULL)
    review_id INT,                                           -- Référence éventuelle à un commentaire (peut être NULL)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,          -- Date et heure de création de l'enregistrement
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
