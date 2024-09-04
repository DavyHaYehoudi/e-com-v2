CREATE TABLE IF NOT EXISTS cart_gift_card (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique
    quantity INT NOT NULL DEFAULT 0,                -- Nombre de gift cards dans le panier
    adding_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date d'ajout de la gift card au panier
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);