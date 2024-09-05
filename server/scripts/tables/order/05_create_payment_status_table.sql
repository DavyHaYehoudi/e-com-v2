CREATE TABLE IF NOT EXISTS `payment_status` (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identifiant unique du statut de paiement
    name VARCHAR(255) NOT NULL,         -- Nom du statut (e.g. Payé, Remboursé)
    color VARCHAR(7) NOT NULL           -- Code couleur hexadécimal pour le badge (e.g. #FF0000)
);
