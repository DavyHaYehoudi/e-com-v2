CREATE TABLE IF NOT EXISTS `order_status` (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identifiant unique du statut de la commande
    name VARCHAR(255) NOT NULL,         -- Nom du statut de la commande (e.g. En cours, Expédiée)
    color VARCHAR(7) NOT NULL           -- Code couleur hexadécimal pour le badge (e.g. #00FF00)
);
