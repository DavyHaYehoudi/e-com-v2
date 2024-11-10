CREATE TABLE IF NOT EXISTS `order_item` (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- Identifiant unique pour chaque ligne d'article
    customer_id INT NOT NULL,                        -- Référence au customer ayant passé la commande
    order_id INT NOT NULL,                           -- Référence à la commande
    product_id INT NOT NULL,                         -- Référence au produit commandé
    variant VARCHAR(255),                            -- Variant optionnel sélectionné par le client
    article_number INT NOT NULL,                     -- Nombre d'articles pour cette ligne de commande
    price_before_discount DECIMAL(10, 2) NOT NULL,   -- Prix total avant réduction
    discount_percentage DECIMAL(10, 2),              -- Pourcentage de réduction (peut être NULL)
    exchange_number INT DEFAULT 0,                   -- Nombre d'articles échangés
    exchange_at DATE,                                -- Date de l'échange (peut être NULL)
    refund_number INT DEFAULT 0,                     -- Nombre d'articles remboursés
    refund_at DATE,                                  -- Date du remboursement (peut être NULL)
    refund_amount DECIMAL(10, 2)                     -- Montant total remboursé (peut être NULL)
    return_at DATE,                                  -- Date de retour des articles
    return_number INT DEFAULT 0                      -- Nombre d'articles retournés
);
