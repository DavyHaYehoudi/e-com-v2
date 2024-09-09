CREATE TABLE IF NOT EXISTS cart_gift_card (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique
    cart_id INT NULL,                            -- Référence à la table cart
    quantity INT NOT NULL, --
    amount INT NOT NULL, -- Montant de la gift_card
    adding_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date d'ajout de la gift card au panier
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);