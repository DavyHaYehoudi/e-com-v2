CREATE TABLE IF NOT EXISTS authentication (
    digit_code TEXT NOT NULL, 
    email TEXT NOT NULL, 
    expires_at TEXT NOT NULL, 
    UNIQUE (email)
);
