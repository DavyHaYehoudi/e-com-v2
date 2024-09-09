CREATE TABLE IF NOT EXISTS wishlist_gift_card (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique
    wishlist_id INT NULL,                            -- Référence à la table wishlist
    quantity INT NOT NULL,                -- Nombre de gift cards dans la wishlist
    amount INT NOT NULL,                       -- Montant de la gift_card
    adding_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date d'ajout de la gift card à la wishlist
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
