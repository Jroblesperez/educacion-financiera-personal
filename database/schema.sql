CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  email TEXT UNIQUE,
  password TEXT
);

CREATE TABLE IF NOT EXISTS transacciones (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  tipo TEXT,
  monto NUMERIC,
  categoria TEXT,
  fecha DATE,
  descripcion TEXT
);

CREATE TABLE IF NOT EXISTS alertas (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  categoria TEXT,
  umbral NUMERIC
);

INSERT INTO usuarios (nombre, email, password) VALUES
  ('Laura Gómez', 'laura@example.com', '123456'),
  ('Andrés Ramírez', 'andres@example.com', '123456')
ON CONFLICT DO NOTHING;

INSERT INTO transacciones (usuario_id, tipo, monto, categoria, fecha, descripcion) VALUES
  (1, 'ingreso', 2500000, 'Salario', '2023-09-30', 'Pago mensual'),
  (1, 'egreso', 450000, 'Arriendo', '2023-10-01', 'Apartamento'),
  (1, 'egreso', 200000, 'Transporte', '2023-10-02', 'Transporte público'),
  (2, 'ingreso', 1800000, 'Freelance', '2023-09-28', 'Proyecto UX'),
  (2, 'egreso', 320000, 'Alimentación', '2023-09-29', 'Mercado quincenal');

INSERT INTO alertas (usuario_id, categoria, umbral) VALUES
  (1, 'Alimentación', 400000),
  (1, 'Ocio', 200000),
  (2, 'Transporte', 250000)
ON CONFLICT DO NOTHING;
