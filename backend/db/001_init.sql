CREATE TABLE volunteers (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(100),
                            email VARCHAR(150) UNIQUE,
                            password VARCHAR(255) NOT NULL,
                            phone_number VARCHAR(20),
                            birth_date DATE,
                            about_me TEXT
);

CREATE TABLE activities (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            title VARCHAR(200) NOT NULL,
                            description TEXT,
                            location VARCHAR(255),
                            activity_date DATETIME NOT NULL,
                            max_participants INT DEFAULT 0,
                            category ENUM('social', 'ambiental', 'educativa', 'salud') DEFAULT 'social',
                            status ENUM('programada', 'en curso', 'finalizada', 'cancelada') DEFAULT 'programada'
);

CREATE TABLE volunteers_activities (
                                       volunteer_id INT NOT NULL,
                                       activity_id INT NOT NULL,
                                       enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                       status ENUM('inscrito', 'asistio', 'cancelo', 'lista_espera') DEFAULT 'inscrito',

                                       PRIMARY KEY (volunteer_id, activity_id),

                                       CONSTRAINT fk_volunteer
                                           FOREIGN KEY (volunteer_id) REFERENCES volunteers(id)
                                               ON DELETE CASCADE,

                                       CONSTRAINT fk_activity
                                           FOREIGN KEY (activity_id) REFERENCES activities(id)
                                               ON DELETE CASCADE
);

INSERT INTO volunteers (name, email, password, phone_number, birth_date, about_me) VALUES
                                                                                       ('Juan Pérez', 'juan.perez@email.com', '$2y$10$e0MYzXy...', '600111222', '1990-05-15', 'Soy voluntario en reforestación y limpieza de playas.'),
                                                                                       ('María García', 'm.garcia@email.com', '$2y$10$e0MYzXy...', '600333444', '1985-11-20', 'Enfermera jubilada con ganas de colaborar en aspectos de salud.'),
                                                                                       ('Carlos López', 'clopez@email.com', '$2y$10$e0MYzXy...', '600555666', '1998-02-10', 'Estudiante de ingeniería, puedo ayudar con tareas logísticas y técnicas.'),
                                                                                       ('Ana Martínez', 'ana.mtz@email.com', '$2y$10$e0MYzXy...', '600777888', '1992-08-30', 'Especialista en educación infantil. Podría dar clases de apoyo.'),
                                                                                       ('Luis Rodríguez', 'lucho_rod@email.com', '$2y$10$e0MYzXy...', '600999000', '1980-03-12', 'Cocinero profesional interesado en colaborar en comedores sociales.'),
                                                                                       ('Elena Sánchez', 'elena.s@email.com', '$2y$10$e0MYzXy...', '611222333', '1995-07-25', 'Aficionada a la fotografía y redes sociales para dar visibilidad a causas.'),
                                                                                       ('Diego Gómez', 'dgomez@email.com', '$2y$10$e0MYzXy...', '622333444', '1988-12-05', 'Experto en huertos urbanos y sostenibilidad ambiental.'),
                                                                                       ('Lucía Díaz', 'lucia.diaz@email.com', '$2y$10$e0MYzXy...', '633444555', '2001-01-18', 'Tengo muchas ganas de aprender y ayudar en lo que sea.'),
                                                                                       ('Javier Ruiz', 'j.ruiz@email.com', '$2y$10$e0MYzXy...', '644555666', '1975-06-02', 'Conductor de camiones, disponible para transporte de donaciones.'),
                                                                                       ('Sofía Morales', 'sofia.m@email.com', '$2y$10$e0MYzXy...', '655666777', '1993-09-09', 'Psicóloga especializada en apoyo emocional a personas mayores.');

INSERT INTO activities (title, description, location, activity_date, max_participants, category, status) VALUES
                                                                                                             ('Reforestación del Bosque Local', 'Plantación de 200 árboles autóctonos para recuperar la zona afectada por el incendio.', 'Parque Natural', '2026-05-10 09:00:00', 50, 'ambiental', 'programada'),
                                                                                                             ('Taller de Lectura para Niños', 'Lectura de cuentos y actividades lúdicas para fomentar el hábito de lectura en la biblioteca.', 'Biblioteca Municipal', '2026-04-15 17:30:00', 10, 'educativa', 'programada'),
                                                                                                             ('Reparto de Alimentos Semanal', 'Clasificación y entrega de lotes de provisiones a familias del barrio.', 'Centro Social', '2026-03-25 10:00:00', 15, 'social', 'en curso');