CREATE TABLE IF NOT EXISTS wishlist_gift_card (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique
    quantity INT NOT NULL DEFAULT 0,                -- Nombre de gift cards dans la wishlist
    adding_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date d'ajout de la gift card à la wishlist
    wishlist_id INT NOT NULL,                            -- Référence à la table wishlist
    gift_card_id INT NOT NULL,                       -- Référence à la table gift_card
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
