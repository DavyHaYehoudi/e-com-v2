CREATE TABLE IF NOT EXISTS shipping_method_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identifiant unique pour chaque ensemble de paramètres de méthode de livraison
    estimated_days INT NOT NULL,                  -- Nombre estimé de jours pour la livraison
    shipping_method_tarifs_id INT NOT NULL,       -- Référence à la table shipping_method_tarifs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création des paramètres
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);
