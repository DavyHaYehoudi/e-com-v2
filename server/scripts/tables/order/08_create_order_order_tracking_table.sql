CREATE TABLE IF NOT EXISTS `order_tracking` (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identifiant unique pour chaque suivi
    sender ENUM('admin', 'customer') NOT NULL,        -- Indique l'expéditeur du numéro de suivi (admin ou client)
    tracking_number VARCHAR(255) NOT NULL,            -- Numéro de suivi du colis
    date_sending DATE NOT NULL,                       -- Date à laquelle le colis a été envoyé (renseignée par admin ou client)
    order_id INT NOT NULL                            -- Référence à l'identifiant de la commande concernée
);
