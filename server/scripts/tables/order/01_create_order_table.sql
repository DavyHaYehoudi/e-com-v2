CREATE TABLE IF NOT EXISTS `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,                        -- Identifiant unique de la commande
    customer_id INT NOT NULL,                                 -- Référence au client
    order_status_id INT NOT NULL,                             -- Statut de la commande
    payment_status_id INT NOT NULL,                           -- Statut du paiement
    payment_method_id INT NOT NULL,                           -- Méthode de paiement utilisée
    order_number VARCHAR(9) NOT NULL,                         -- Numéro de commande unique (9 caractères alphanumériques)
    notes_admin TEXT,                                         -- Commentaires laissés par l'admin sur cette commande
    order_gift_card_id INT,                                   -- Référence aux gift cards utilisées
    code_promo_id INT,                                        -- Référence à un code promo appliqué
    total_price DECIMAL(10, 2) NOT NULL,                      -- Prix total de la commande
    shipping_price DECIMAL(10, 2) NOT NULL,                   -- Prix de la livraison
    order_address_shipping_id INT NOT NULL,                   -- Adresse de livraison associée à la commande
    order_address_billing_id INT NOT NULL,                    -- Adresse de facturation associée à la commande
    shipping_method_id INT NOT NULL,                          -- Méthode de livraison utilisée
    cashback_earned DECIMAL(10, 2),                           -- Montant de cashback gagné pour cette commande
    cashback_spent DECIMAL(10, 2),                            -- Montant de cashback dépensé pour cette commande
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,           -- Date de création de la commande
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Date de mise à jour de la commande
);
