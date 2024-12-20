CREATE TABLE IF NOT EXISTS order_address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('shipping', 'billing') NOT NULL,
    company VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100), 
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    street_number VARCHAR(10),
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'France',
    order_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
