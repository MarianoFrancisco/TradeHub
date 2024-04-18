CREATE DATABASE tradehub;
USE tradehub;

CREATE TABLE rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE,
    rol_id INT,
    name VARCHAR(255),
    pwd VARCHAR(200),
    birthdate DATE,
    phone VARCHAR(50),
    FOREIGN KEY (rol_id) REFERENCES rol(id)
);

CREATE TABLE user_coin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    users_id INT,
    volunteerism_coin DECIMAL(10,2),
    system_coin DECIMAL(10,2),
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE publication_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE publication_state (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE publication (
    id INT AUTO_INCREMENT PRIMARY KEY,
    users_id INT,
    publication_type_id INT,
    publication_state_id INT,
    category_id INT,
    title VARCHAR(255),
    description TEXT,
    image VARCHAR(500),
    quantity INT,
    unity_price DECIMAL(10,2),
    date DATE,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (publication_type_id) REFERENCES publication_type(id),
    FOREIGN KEY (publication_state_id) REFERENCES publication_state(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_users_id INT,
    seller_users_id INT,
    publication_id INT,
    FOREIGN KEY (buyer_users_id) REFERENCES users(id),
    FOREIGN KEY (seller_users_id) REFERENCES users(id),
    FOREIGN KEY (publication_id) REFERENCES publication(id)
);

CREATE TABLE message_chat(
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT,
    users_id INT,
    date DATETIME,
    message VARCHAR(3000),
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (chat_id) REFERENCES chat(id)
);

CREATE TABLE publication_reported (
    id INT AUTO_INCREMENT PRIMARY KEY,
    users_id INT,
    publication_id INT,
    description TEXT,
    date DATE,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (publication_id) REFERENCES publication(id)
);

CREATE TABLE transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_users_id INT,
    seller_users_id INT,
    publication_id INT,
    publication_type_id INT,
    quantity INT,
    unity_price DECIMAL(10,2),
    date DATE,
    description TEXT,
    total DECIMAL(10,2),
    FOREIGN KEY (buyer_users_id) REFERENCES users(id),
    FOREIGN KEY (seller_users_id) REFERENCES users(id),
    FOREIGN KEY (publication_id) REFERENCES publication(id),
    FOREIGN KEY (publication_type_id) REFERENCES publication_type(id)
);