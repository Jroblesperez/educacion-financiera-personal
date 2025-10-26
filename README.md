# Plataforma de Educación Financiera Personal

Este repositorio contiene un prototipo funcional de una plataforma web de educación financiera orientada a jóvenes y adultos colombianos. Incluye un frontend en React con TailwindCSS, un backend en Node.js con Express y un script SQL básico para PostgreSQL.

## 📦 Estructura del proyecto

```
frontend/   # Aplicación React (Vite + TailwindCSS)
backend/    # API Express con datos simulados en memoria
database/   # Script SQL para crear tablas en PostgreSQL
```

## 🚀 Frontend (React + TailwindCSS)

1. Instala dependencias
   ```bash
   cd frontend
   npm install
   ```
2. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   ```
3. La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

### Características destacadas
- Componentes reutilizables (`Input`, `Select`, `Navbar`).
- Pantalla de inicio de sesión (`/login`).
- Dashboard con navegación lateral y rutas para registro de transacciones, reportes gráficos (Chart.js) y alertas configurables.
- Datos simulados y lógica básica de alertas para mostrar el comportamiento esperado.

## 🧰 Backend (Node.js + Express)

1. Instala dependencias
   ```bash
   cd backend
   npm install
   ```
2. Levanta el servidor de desarrollo
   ```bash
   npm run dev
   ```
3. La API estará disponible en [http://localhost:4000](http://localhost:4000).

### Endpoints disponibles
- `POST /login` – Simula autenticación y retorna un token de prueba.
- `GET /transacciones` y `POST /transacciones` – Manejo de ingresos y egresos en memoria.
- `GET /reportes` – Devuelve datos agregados mensuales.
- `POST /alertas` y `GET /alertas` – Configuración y consulta de alertas por categoría.

## 🗃️ Base de datos (PostgreSQL)

En la carpeta `database/` se incluye el archivo `schema.sql` con la definición de tablas `usuarios`, `transacciones` y `alertas`, además de algunos registros de ejemplo para pruebas.

Para ejecutar el script:
```bash
psql -U <usuario> -d <base_de_datos> -f database/schema.sql
```

## 📝 Notas adicionales
- Todos los datos manejados son simulados y se almacenan en memoria para facilitar el prototipado.
- Ajusta credenciales, lógica de negocio y persistencia según los requerimientos de tu implementación final.
