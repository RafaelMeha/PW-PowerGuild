DROP DATABASE IF EXISTS powerguild;
CREATE DATABASE powerguild;
USE powerguild;

CREATE TABLE IF NOT EXISTS platforms (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS developers (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    contact_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS payments (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    card_name VARCHAR(50) NOT NULL,
    card_number BIGINT NOT NULL,    
    cvc VARCHAR(3) NOT NULL,
    due_date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    pwd VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    address VARCHAR(50) NOT NULL,
    postal_code VARCHAR(7) NOT NULL,
    phone_number VARCHAR(9) NOT NULL,
    fk_user_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    discount INT,
    price FLOAT NOT NULL,
    quantity INT,
    launch_date TIMESTAMP,
    Type ENUM('Physical', 'Non-Physical'),
    category VARCHAR(255),
    fk_developers_id INT NOT NULL,
    fk_suppliers_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    date TIMESTAMP,
    discount INT,
    distributorsPrice INT,
    fk_distributors_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS distributors (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    ratings INT,
    review_text VARCHAR(250),
    review_date VARCHAR(250) NOT NULL,
    fk_user_id INT NOT NULL,
    fk_product_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS wishlists (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    added_date TIMESTAMP NOT NULL,
    fk_user_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS customers_payments (
    fk_customers_id INT NOT NULL,
    fk_payments_id INT NOT NULL,
    fk_sales_id INT NOT NULL,
    PRIMARY KEY (fk_customers_id, fk_payments_id, fk_sales_id)
);

CREATE TABLE IF NOT EXISTS products_platforms (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fk_platforms_id INT NOT NULL,
    fk_products_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS sales_products (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    quantity INT,
    price FLOAT,
    fk_products_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS products_wishlists (
    fk_products_id INT NOT NULL,
    fk_wishlists_id INT NOT NULL,
    PRIMARY KEY (fk_products_id, fk_wishlists_id)
);


ALTER TABLE customers 
    ADD CONSTRAINT fk_customers_users FOREIGN KEY (fk_user_id) REFERENCES users(id);

ALTER TABLE products 
    ADD CONSTRAINT fk_products_developers FOREIGN KEY (fk_developers_id) REFERENCES developers(id),
    ADD CONSTRAINT fk_products_suppliers FOREIGN KEY (fk_suppliers_id) REFERENCES suppliers(id);

ALTER TABLE reviews 
    ADD CONSTRAINT fk_reviews_users FOREIGN KEY (fk_user_id) REFERENCES users(id),
    ADD CONSTRAINT fk_reviews_products FOREIGN KEY (fk_product_id) REFERENCES products(id);

ALTER TABLE wishlists 
    ADD CONSTRAINT fk_wishlists_users FOREIGN KEY (fk_user_id) REFERENCES users(id);

ALTER TABLE customers_payments 
    ADD CONSTRAINT fk_customers_payments_customers FOREIGN KEY (fk_customers_id) REFERENCES customers(id),
    ADD CONSTRAINT fk_customers_payments_payments FOREIGN KEY (fk_payments_id) REFERENCES payments(id),
    ADD CONSTRAINT fk_customers_payments_sales FOREIGN KEY (fk_sales_id) REFERENCES sales(id);

ALTER TABLE products_platforms 
    ADD CONSTRAINT fk_products_platforms_platforms FOREIGN KEY (fk_platforms_id) REFERENCES platforms(id),
    ADD CONSTRAINT fk_products_platforms_products FOREIGN KEY (fk_products_id) REFERENCES products(id);

ALTER TABLE sales_products 
    ADD CONSTRAINT fk_sales_products_products FOREIGN KEY (fk_products_id) REFERENCES products(id);

ALTER TABLE sales 
    ADD CONSTRAINT fk_sales_distributors FOREIGN KEY (fk_distributors_id) REFERENCES distributors(id);

ALTER TABLE products_wishlists
    ADD CONSTRAINT fk_products_wishlists_products FOREIGN KEY (fk_products_id) REFERENCES products(id),
    ADD CONSTRAINT fk_products_wishlists_wishlists FOREIGN KEY (fk_wishlists_id) REFERENCES wishlists(id);