-- Insertar un registro de Administrador
INSERT INTO rol (id, name, description) VALUES 
(1, 'Administrador', 'Encargado de supervisar las publicaciones'),
(2, 'Usuario', 'Usuario de la plataforma que puede interactuar con compras, ventas y trueque');
-- Insertar un registro de Usuario
INSERT INTO users (id, user_name, rol_id, name, pwd, birthdate, phone) VALUES
(1, 'usuario', 2, 'Nombre del Usuario', '1234', '2000-01-01', '1234567890'),
(2, 'admin', 1, 'Nombre del Administrador', '1234', '1990-01-01', '0987654321'),
(3, 'usuario1', 2, 'Nombre del Usuario', '1234', '2000-01-01', '1234567890');

INSERT INTO user_coin (id, users_id, volunteerism_coin, system_coin) VALUES
(1, 1, 150, 2000),
(2, 3, 15000, 200);

-- Inserción para "compra"
INSERT INTO publication_type (id, name, description) VALUES
(1, 'Compra', 'Esta publicación corresponde a una oferta de compra.'),
(2, 'Venta', 'Esta publicación corresponde a una oferta de venta.'),
(3, 'Trueque (Voluntariado)', 'Esta publicación corresponde a una oferta de trueque.');

INSERT INTO category (id, name, description) VALUES
    (1, 'Electrónica', 'Productos electrónicos y dispositivos.'),
    (2, 'Ropa', 'Prendas de vestir para hombres, mujeres y niños.'),
    (3, 'Hogar', 'Artículos para el hogar, decoración y muebles.'),
    (4, 'Alimentación', 'Productos alimenticios y bebidas.'),
    (5, 'Automóviles', 'Vehículos y accesorios para automóviles.'),
    (6, 'Deportes', 'Equipos y artículos deportivos.'),
    (7, 'Juguetes', 'Juguetes y juegos para niños.'),
    (8, 'Belleza', 'Productos de belleza y cuidado personal.'),
    (9, 'Libros', 'Libros impresos y electrónicos.'),
    (10, 'Electrodomésticos', 'Electrodomésticos para el hogar.'),
    (11, 'Mascotas', 'Suministros y productos para mascotas.'),
    (12, 'Arte y artesanías', 'Obras de arte y productos artesanales.'),
    (13, 'Instrumentos musicales', 'Instrumentos musicales y accesorios.'),
    (14, 'Salud y bienestar', 'Productos y servicios relacionados con la salud.'),
    (15, 'Jardinería', 'Herramientas y suministros de jardinería.'),
    (16, 'Viajes', 'Paquetes de viaje, reservas de hoteles y vuelos.'),
    (17, 'Tecnología', 'Productos relacionados con la tecnología y la informática.'),
    (18, 'Decoración', 'Artículos decorativos para el hogar y accesorios.'),
    (19, 'Bricolaje', 'Herramientas y materiales para proyectos de bricolaje.'),
    (20, 'Entretenimiento', 'Productos y servicios relacionados con el entretenimiento.'),
    (21, 'Moda', 'Productos y accesorios de moda.'),
    (22, 'Bebés y niños', 'Productos y artículos para bebés y niños.'),
    (23, 'Mobiliario', 'Muebles y accesorios para el hogar.'),
    (24, 'Joyería', 'Joyas y accesorios de joyería.'),
    (25, 'Oficina', 'Suministros y mobiliario de oficina.'),
    (26, 'Herramientas', 'Herramientas manuales y eléctricas.'),
    (27, 'Camping y senderismo', 'Equipamiento y accesorios para acampar y hacer senderismo.'),
    (28, 'Fitness', 'Equipamiento y accesorios para el fitness y el ejercicio.');
INSERT INTO publication_state (id, name, description)
VALUES 
    (1, 'En Revisión', 'El artículo está siendo revisado por los moderadores.'),
    (2, 'Aceptado', 'El artículo ha sido aceptado y está disponible para su visualización.'),
    (3, 'Reportado', 'El artículo ha sido reportado y se encuentra bajo revisión.'),
    (4, 'Finalizado', 'El artículo ha sido finalizado y ya no está disponible para su edición.'),
    (5, 'Rechazado', 'El artículo ha sido rechazado y no está disponible para su edición.');

INSERT INTO publication (id, users_id, publication_type_id, publication_state_id, category_id, title, description, image, quantity, unity_price, date) 
VALUES 
(1, 1, 1, 1, 1, 'Ejemplo de publicación', 'Descripción de la publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 10, 25.99, '2024-04-08'),
(2, 3, 2, 2, 2, 'Otra publicación de ejemplo', 'Descripción de otra publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 5, 15.50, '2024-04-09'),
(3, 1, 1, 1, 1, 'Ejemplo de publicación', 'Descripción de la publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 10, 25.99, '2024-04-08'),
(4, 3, 2, 2, 2, 'Otra publicación de ejemplo', 'Descripción de otra publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 5, 15.50, '2024-04-09'),
(5, 1, 1, 1, 1, 'Ejemplo de publicación', 'Descripción de la publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 10, 25.99, '2024-04-08'),
(6, 3, 2, 2, 2, 'Otra publicación de ejemplo', 'Descripción de otra publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 5, 15.50, '2024-04-09'),
(7, 1, 1, 1, 1, 'Ejemplo de publicación', 'Descripción de la publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 10, 25.99, '2024-04-08'),
(8, 3, 2, 2, 2, 'Otra publicación de ejemplo', 'Descripción de otra publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 5, 15.50, '2024-04-09'),
(9, 1, 1, 1, 1, 'Ejemplo de publicación', 'Descripción de la publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 10, 25.99, '2024-04-08'),
(10, 3, 2, 2, 2, 'Otra publicación de ejemplo', 'Descripción de otra publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 5, 15.50, '2024-04-09'),
(11, 1, 1, 1, 1, 'Ejemplo de publicación', 'Descripción de la publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 10, 25.99, '2024-04-08'),
(12, 3, 2, 2, 2, 'Otra publicación de ejemplo', 'Descripción de otra publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 5, 15.50, '2024-04-09'),
(13, 1, 1, 1, 1, 'Ejemplo de publicación', 'Descripción de la publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 10, 25.99, '2024-04-08'),
(14, 3, 2, 2, 2, 'Otra publicación de ejemplo', 'Descripción de otra publicación de ejemplo.', 'http://www.internal.tradehub.gt/img/1712356283-logoRemoveBackground.png', 5, 15.50, '2024-04-09');
