CREATE TABLE IF NOT EXISTS notes_admin (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    notes_admin TEXT,                                -- Notes ou commentaires de l'admin sur un customer
    customer_id INT,                                 -- Identifiant du customer associé
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date et heure de dernière mise à jour
);