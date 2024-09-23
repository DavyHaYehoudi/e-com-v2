CREATE TABLE IF NOT EXISTS `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,                        -- Identifiant unique de la commande
    customer_id INT NOT NULL,                                 -- Référence au client
    order_status_id INT NOT NULL,                             -- Statut de la commande
    payment_status_id INT NOT NULL,                           -- Statut du paiement
    confirmation_number VARCHAR(9) NOT NULL,                  -- Numéro de commande unique (9 caractères alphanumériques)
    notes_admin TEXT,                                         -- Commentaires laissés par l'admin sur cette commande
    code_promo_amount DECIMAL(10, 2),                         -- Montant de réduction par le code promo appliqué
    total_promo_products DECIMAL(10, 2),                      -- Total des promotions cumulées pour les produits achetés
    total_price DECIMAL(10, 2) NOT NULL,                      -- Prix total de la commande
    shipping_price DECIMAL(10, 2) NOT NULL,                   -- Prix de la livraison
    total_weight DECIMAL(10, 2),                              -- Total du poids des produits
    cashback_earned DECIMAL(10, 2),                           -- Montant de cashback gagné pour cette commande
    cashback_spent DECIMAL(10, 2),                            -- Montant de cashback dépensé pour cette commande
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,           -- Date de création de la commande
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de mise à jour de la commande
);
