CREATE TABLE IF NOT EXISTS `order_status` (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identifiant unique du statut de la commande
    label VARCHAR(255) NOT NULL,         -- Nom du statut de la commande (e.g. En cours, Expédiée)
    color VARCHAR(7) NOT NULL           -- Code couleur hexadécimal pour le badge (e.g. #00FF00)
);

-- Ajouter les labels et les couleurs dans la table order_status
INSERT INTO `order_status` (label, color) VALUES 
('A traiter', '#FFD700'),       -- Jaune doré pour "A traiter"
('En cours de traitement', '#00BFFF'),  -- Bleu pour "En cours de traitement"
('Expédiée', '#32CD32'),        -- Vert pour "Expédiée"
('Retournée', '#FF4500'),       -- Rouge orange pour "Retournée"
('Retour partiel', '#FFA07A');  -- Saumon clair pour "Retour partiel"
