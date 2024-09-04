CREATE TABLE IF NOT EXISTS shipping_method_tarifs (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque tarif de méthode de livraison
    price DECIMAL(10,2) NOT NULL,                 -- Prix de la méthode de livraison
    ship_charge DECIMAL(10,2) NOT NULL,           -- Frais d'expédition associés à la méthode de livraison
    shipping_method_settings_id INT NOT NULL,     -- Référence aux paramètres de méthode de livraison
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création du tarif
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Date de dernière mise à jour
);
