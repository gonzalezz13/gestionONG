CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255),
                       email VARCHAR(255) UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       phone_number VARCHAR(255),
                       birth_date DATE,
                       about_me VARCHAR(255),
                       rol ENUM('volunteer', 'admin') DEFAULT 'volunteer',
                       interest_area VARCHAR(255),
                       availability VARCHAR(255),
                       reset_token VARCHAR(255),
                       reset_token_expiry DATETIME(6)
);

CREATE TABLE activities (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            title VARCHAR(200) NOT NULL,
                            description TEXT,
                            location VARCHAR(255),
                            image_url VARCHAR(500),
                            difficulty VARCHAR(100),
                            activity_date DATETIME NOT NULL,
                            max_participants INT DEFAULT 0,
                            category ENUM('social', 'ambiental', 'educativa', 'salud') DEFAULT 'social',
                            status ENUM('programada', 'en curso', 'finalizada', 'cancelada') DEFAULT 'programada'
);

CREATE TABLE users_activities (
                                   user_id INT NOT NULL,
                                   activity_id INT NOT NULL,
                                   enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   status ENUM('inscrito', 'asistio', 'cancelo', 'lista_espera') DEFAULT 'inscrito',

                                   PRIMARY KEY (user_id, activity_id),

                                   CONSTRAINT fk_user
                                       FOREIGN KEY (user_id) REFERENCES users(id)
                                           ON DELETE CASCADE,

                                   CONSTRAINT fk_activity
                                       FOREIGN KEY (activity_id) REFERENCES activities(id)
                                           ON DELETE CASCADE
);

INSERT INTO users (name, email, password, phone_number, birth_date, about_me, rol, interest_area, availability, reset_token, reset_token_expiry) VALUES
    ('Juan Pérez', 'juan.perez@email.com', '$2y$10$e0MYzXy...', '600111222', '1990-05-15', 'Soy voluntario en reforestación y limpieza de playas.', 'volunteer', NULL, NULL, NULL, NULL),
    ('María García', 'm.garcia@email.com', '$2y$10$e0MYzXy...', '600333444', '1985-11-20', 'Enfermera jubilada con ganas de colaborar en aspectos de salud.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Carlos López', 'clopez@email.com', '$2y$10$e0MYzXy...', '600555666', '1998-02-10', 'Estudiante de ingeniería, puedo ayudar con tareas logísticas y técnicas.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Ana Martínez', 'ana.mtz@email.com', '$2y$10$e0MYzXy...', '600777888', '1992-08-30', 'Especialista en educación infantil. Podría dar clases de apoyo.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Luis Rodríguez', 'lucho_rod@email.com', '$2y$10$e0MYzXy...', '600999000', '1980-03-12', 'Cocinero profesional interesado en colaborar en comedores sociales.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Elena Sánchez', 'elena.s@email.com', '$2y$10$e0MYzXy...', '611222333', '1995-07-25', 'Aficionada a la fotografía y redes sociales para dar visibilidad a causas.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Diego Gómez', 'dgomez@email.com', '$2y$10$e0MYzXy...', '622333444', '1988-12-05', 'Experto en huertos urbanos y sostenibilidad ambiental.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Lucía Díaz', 'lucia.diaz@email.com', '$2y$10$e0MYzXy...', '633444555', '2001-01-18', 'Tengo muchas ganas de aprender y ayudar en lo que sea.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Javier Ruiz', 'j.ruiz@email.com', '$2y$10$e0MYzXy...', '644555666', '1975-06-02', 'Conductor de camiones, disponible para transporte de donaciones.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Sofía Morales', 'sofia.m@email.com', '$2y$10$e0MYzXy...', '655666777', '1993-09-09', 'Psicóloga especializada en apoyo emocional a personas mayores.', 'volunteer', NULL, NULL, NULL, NULL),
    ('Admin ONG', 'admin@ong.com', '$2y$10$e0MYzXy...', '600000000', '1980-01-01', 'Administrador de la plataforma.', 'admin', NULL, NULL, NULL, NULL);

INSERT INTO activities (title, description, location, image_url, difficulty, activity_date, max_participants, category, status) VALUES
    ('Reforestación del Bosque Local', 'Plantación de 200 árboles autóctonos para recuperar la zona afectada por el incendio.', 'Parque Natural', '', NULL, '2026-05-10 09:00:00', 50, 'ambiental', 'programada'),
    ('Taller de Lectura para Niños', 'Lectura de cuentos y actividades lúdicas para fomentar el hábito de lectura en la biblioteca.', 'Biblioteca Municipal', '', NULL, '2026-04-15 17:30:00', 10, 'educativa', 'programada'),
    ('Reparto de Alimentos Semanal', 'Clasificación y entrega de lotes de provisiones a familias del barrio.', 'Centro Social', '', NULL, '2026-03-25 10:00:00', 15, 'social', 'en curso');
CREATE TABLE noticias (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          title VARCHAR(255) NOT NULL,
                          date VARCHAR(255) NOT NULL,
                          summary TEXT,
                          image VARCHAR(255),
                          category VARCHAR(255)
);

INSERT INTO noticias (id, title, date, summary, image, category) VALUES
    (1, 'Nueva campaña de reforestación en el Amazonas', '24 Abr 2026', 'Lanzamos una iniciativa para plantar más de 10.000 árboles nativos en zonas afectadas por la deforestación.', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', 'Medio Ambiente'),
    (2, 'Éxito en la Gala Benéfica Anual', '15 Mar 2026', 'Gracias a vuestra generosidad, hemos recaudado fondos suficientes para abrir tres nuevos centros educativos.', 'https://images.unsplash.com/photo-1511175510645-e404bb057622?auto=format&fit=crop&q=80&w=800', 'Eventos'),
    (3, 'Programa de formación para jóvenes voluntarios', '02 Feb 2026', 'Abrimos las inscripciones para el nuevo curso intensivo de liderazgo social y gestión de proyectos comunitarios.', 'https://images.unsplash.com/photo-1523158066336-48053c90a3a4?auto=format&fit=crop&q=80&w=800', 'Educación'),
    (4, 'Alianza estratégica con Salud Global', '20 Ene 2026', 'Unimos fuerzas para llevar suministros médicos básicos a comunidades remotas en el sudeste asiático.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800', 'Salud'),
    (5, 'Impacto social: Informe del primer trimestre', '10 Ene 2026', 'Analizamos los logros alcanzados en estos primeros meses del año y los retos que nos quedan por delante.', 'https://images.unsplash.com/photo-1480926956917-a0dab273d7ab?auto=format&fit=crop&q=80&w=800', 'Corporativo');

CREATE TABLE guidelines (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            title VARCHAR(255) NOT NULL,
                            description TEXT,
                            category VARCHAR(255),
                            size VARCHAR(255),
                            date VARCHAR(255),
                            icon_color VARCHAR(255),
                            download_url VARCHAR(255)
);

INSERT INTO guidelines (id, title, description, category, size, date, icon_color, download_url) VALUES
    (1, 'Declaración de Misión 2026', 'Valores fundamentales, objetivos a largo plazo y nuestro enfoque comunitario.', 'MISIÓN', '1.2 MB', 'Oct 12', 'red', 'assets/docs/Declaracion_Mision_2026.pdf'),
    (2, 'Guía de Integración de Voluntarios', 'Procedimientos operativos estándar para nuevos voluntarios que ingresan.', 'OPERACIONES', '2.4 MB', 'Sep 28', 'blue', 'assets/docs/Guia_Integracion_Voluntarios.pdf'),
    (3, 'Código de Conducta y Ética', 'Nuestros estándares obligatorios para el comportamiento profesional.', 'LEGAL', '850 KB', 'Oct 05', 'yellow', 'assets/docs/Codigo_Conducta_Etica.pdf'),
    (4, 'Protocolo de Respuesta a Emergencias', 'Instrucciones paso a paso para el manejo de crisis durante asignaciones.', 'SEGURIDAD', '3.1 MB', 'Ago 15', 'green', 'assets/docs/Protocolo_Respuesta_Emergencias.pdf'),
    (5, 'Informe de Impacto Anual 2025', 'Revisión de nuestros logros, transparencia financiera y estadísticas.', 'REPORTES', '5.8 MB', 'Ene 20', 'purple', 'assets/docs/Informe_Impacto_Anual_2025.pdf'),
    (6, 'Toolkit de Marca y Mensajes', 'Pautas para redes sociales, representación pública y uso oficial de logotipos.', 'COMUNICACIÓN', '12.5 MB', 'Nov 02', 'orange', 'assets/docs/Toolkit_Marca_Mensajes.pdf'),
    (7, 'Manual del Voluntariado', 'Todo lo que necesitas saber sobre nuestras expectativas y el código de comportamiento.', 'MISIÓN', '2.1 MB', 'Dic 05', 'red', 'assets/docs/Manual_Voluntariado.pdf'),
    (8, 'Directrices de Contabilidad', 'Políticas de reporte financiero, transparencia contable y manejo de donativos.', 'OPERACIONES', '4.0 MB', 'Mar 12', 'blue', 'assets/docs/Directrices_Contabilidad.pdf'),
    (9, 'Guía de Ciberseguridad', 'Protección de datos de usuarios, mejores prácticas de contraseñas y privacidad.', 'SEGURIDAD', '1.8 MB', 'Feb 22', 'green', 'assets/docs/Guia_Ciberseguridad.pdf'),
    (10, 'Políticas de Privacidad', 'Normativas sobre el tratamiento de la información personal de nuestros donantes.', 'LEGAL', '600 KB', 'May 14', 'yellow', 'assets/docs/Politicas_Privacidad.pdf'),
    (11, 'Informe de Auditoría Externa', 'Documento de certificación oficial que avala la transparencia de nuestras cuentas.', 'REPORTES', '8.4 MB', 'Jun 30', 'purple', 'assets/docs/Informe_Auditoria_Externa.pdf'),
    (12, 'Manual de Redes Sociales', 'Tono de voz, gestión de crisis online y plantillas para publicaciones oficiales.', 'COMUNICACIÓN', '15.2 MB', 'Jul 01', 'orange', 'assets/docs/Manual_Redes_Sociales.pdf');

CREATE TABLE contact_messages (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  asunto VARCHAR(255) NOT NULL,
                                  email VARCHAR(255) NOT NULL,
                                  fecha_envio DATETIME(6) NOT NULL,
                                  leido BIT(1) NOT NULL,
                                  mensaje TEXT NOT NULL,
                                  nombre VARCHAR(255) NOT NULL,
                                  privacidad BIT(1) NOT NULL,
                                  fecha_respuesta DATETIME(6),
                                  respuesta TEXT
);


CREATE TABLE chat_messages (
                               id BIGINT AUTO_INCREMENT PRIMARY KEY,
                               content TEXT NOT NULL,
                               is_admin BIT(1) NOT NULL,
                               sender_email VARCHAR(255) NOT NULL,
                               timestamp DATETIME(6) NOT NULL,
                               contact_message_id BIGINT NOT NULL,
                               admin BIT(1),
                               CONSTRAINT fk_contact_message
                                   FOREIGN KEY (contact_message_id) REFERENCES contact_messages(id)
                                       ON DELETE CASCADE
);


