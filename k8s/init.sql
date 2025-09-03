-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

-- Insert sample data
INSERT INTO products (name, price) VALUES
('Laptop', 1200.00),
('Phone', 600.00),
('Headphones', 150.00)
ON CONFLICT DO NOTHING;

