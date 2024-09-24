CREATE TABLE IF NOT EXISTS notes_admin_on_order (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    notes_admin TEXT,                                -- Notes ou commentaires de l'admin sur une commande
    order_id INT,                                     -- Identifiant de la commande associée
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date et heure de dernière mise à jour
);