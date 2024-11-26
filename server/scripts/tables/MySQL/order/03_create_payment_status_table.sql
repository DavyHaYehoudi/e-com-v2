CREATE TABLE IF NOT EXISTS `payment_status` (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identifiant unique du statut de paiement
    label VARCHAR(255) NOT NULL,         -- Nom du statut (e.g. Payé, Remboursé)
    color VARCHAR(7) NOT NULL           -- Code couleur hexadécimal pour le badge (e.g. #FF0000)
);

-- Ajouter les labels et les couleurs dans la table payment_status
INSERT INTO `payment_status` (label, color) VALUES 
('Payée', '#32CD32'),               -- Vert pour "Payée"
('En attente', '#1E90FF'),          -- Bleu clair pour "En attente" (Staging)
('Refusée', '#DC143C'),             -- Rouge cramoisi pour "Refusée"
('Remboursée', '#FF6347'),          -- Rouge tomate pour "Remboursée"
('Remboursement partiel', '#FFA07A');  -- Saumon clair pour "Remboursement partiel"

