CREATE TABLE IF NOT EXISTS review (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique
    customer_id INT NOT NULL,                         -- Référence au client auteur du commentaire
    order_id INT NOT NULL,                            -- Référence à la commande en question
    product_id INT NOT NULL,                          -- Référence au produit pour lequel le commentaire est laissé
    review_text TEXT NOT NULL,                        -- Texte du commentaire
    rating TINYINT UNSIGNED NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5), -- Nombre d'étoiles, entre 1 et 5, par défaut 5
    is_validate_by_admin BOOLEAN DEFAULT FALSE,       -- Indique si le commentaire est validé par l'administrateur
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Date et heure de création de l'enregistrement
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date et heure de dernière mise à jour
);
