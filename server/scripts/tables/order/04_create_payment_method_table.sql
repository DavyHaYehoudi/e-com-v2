CREATE TABLE IF NOT EXISTS `payment_method` (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identifiant unique de la méthode de paiement
    name VARCHAR(255) NOT NULL,         -- Nom de la méthode de paiement (e.g. VISA, Mastercard)
    image VARCHAR(255) NOT NULL         -- URL de l'image représentant la méthode de paiement
);
