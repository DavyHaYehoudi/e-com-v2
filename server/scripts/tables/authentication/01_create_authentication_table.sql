CREATE TABLE IF NOT EXISTS authentication (
    digit_code CHAR(6) NOT NULL,
    email VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
);
