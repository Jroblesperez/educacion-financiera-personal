# Plataforma de Educación Financiera Personal

Este repositorio contiene un prototipo funcional de una plataforma web de educación financiera orientada a jóvenes y adultos colombianos. Incluye un frontend en React con TailwindCSS, un backend en Node.js con Express y un script SQL básico para PostgreSQL.

## 📦 Estructura del proyecto

```
frontend/   # Aplicación React (Vite + TailwindCSS)
backend/    # API Express con datos simulados en memoria
database/   # Script SQL para crear tablas en PostgreSQL
```

## ✅ Requisitos previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada) y npm.
- [PostgreSQL](https://www.postgresql.org/) si deseas probar el script de base de datos.

## 🚀 Puesta en marcha paso a paso

### 1. Clonar el repositorio (si aún no lo tienes)

```bash
git clone <url-del-repositorio>
cd educacion-financiera-personal
```

### 2. Iniciar el backend (API Express)

```bash
cd backend
npm install
npm run dev
```

El servidor quedará escuchando en [http://localhost:4000](http://localhost:4000). Déjalo ejecutándose en una terminal.

### 3. Iniciar el frontend (React + Tailwind)

En una segunda terminal desde la raíz del proyecto:

```bash
cd frontend
npm install
npm run dev
```

El cliente estará disponible en [http://localhost:5173](http://localhost:5173). Accede con tu navegador.

### 4. (Opcional) Preparar la base de datos PostgreSQL

Si deseas crear las tablas y cargar datos de ejemplo:

```bash
psql -U <usuario> -d <base_de_datos> -f database/schema.sql
```

## 📊 Funcionalidades principales

- Componentes reutilizables (`Input`, `Select`, `Navbar`).
- Pantalla de inicio de sesión (`/login`).
- Dashboard con navegación lateral y rutas para registro de transacciones, reportes gráficos (Chart.js) y alertas configurables.
- Datos simulados y lógica básica de alertas para mostrar el comportamiento esperado.

## 🧰 Endpoints disponibles en la API

- `POST /login` – Simula autenticación y retorna un token de prueba.
- `GET /transacciones` y `POST /transacciones` – Manejo de ingresos y egresos en memoria.
- `GET /reportes` – Devuelve datos agregados mensuales.
- `POST /alertas` y `GET /alertas` – Configuración y consulta de alertas por categoría.

## 🗃️ Base de datos (PostgreSQL)

En la carpeta `database/` se incluye el archivo `schema.sql` con la definición de tablas `usuarios`, `transacciones` y `alertas`, además de algunos registros de ejemplo para pruebas. Sigue el paso 4 anterior para ejecutarlo en tu instancia de PostgreSQL.

## 📝 Notas adicionales
- Todos los datos manejados son simulados y se almacenan en memoria para facilitar el prototipado.
- Ajusta credenciales, lógica de negocio y persistencia según los requerimientos de tu implementación final.
