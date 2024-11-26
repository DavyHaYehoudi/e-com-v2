CREATE TABLE IF NOT EXISTS `order_message` (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- Identifiant unique du message
    sender ENUM('admin', 'customer') NOT NULL,       -- Indique l'expéditeur du message (admin ou client)
    body TEXT NOT NULL,                              -- Contenu du message
    order_id INT NOT NULL,                           -- Référence à l'identifiant de la commande concernée
    is_read BOOLEAN DEFAULT FALSE,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP           -- Date de création de la commande
);
