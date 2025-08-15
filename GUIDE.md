# 📅 Proyecto 1 — Planificador Inteligente de Tareas  
**Guía detallada paso a paso (sin código)**

---

## 0) Resumen del Proyecto
- **Objetivo**: Crear una aplicación web para gestionar tareas con un asistente de IA que sugiera la prioridad óptima según la fecha límite, duración estimada y contenido de la tarea.  
- **Stack principal**:  
  - **Frontend**: React + TailwindCSS  
  - **Backend API**: Node.js + Express + Mongoose  
  - **Microservicio de IA**: Python + FastAPI + scikit-learn  
  - **Base de datos**: MongoDB Atlas  
- **Arquitectura**: Tres servicios separados (`frontend`, `backend`, `ai`) conectados a una base de datos común.  
- **Despliegue**:  
  - Frontend en Vercel  
  - Backend y servicio de IA en Render, Railway o Fly.io  
- **Duración estimada**: ~20 horas de trabajo.

---

## 1) Requisitos iniciales

### 1.1 Software necesario
- **Node.js** LTS (versión 18 o superior)  
- **Python** 3.10 o 3.11  
- **Git** para control de versiones  
- **npm** o **pnpm** para gestión de paquetes en Node.js  
- **Editor recomendado**: Visual Studio Code (extensiones recomendadas: ESLint, Prettier, Python)  
- **Opcional**: Docker Desktop (para entornos aislados)

### 1.2 Cuentas y plataformas
- **GitHub** (repositorio del proyecto)  
- **MongoDB Atlas** (base de datos en la nube, gratuita)  
- **Vercel** (para desplegar frontend)  
- **Render / Railway / Fly.io** (para desplegar backend y servicio de IA)

### 1.3 Estructura inicial del proyecto
portfolio-planner/
frontend/ # Aplicación React
backend/ # API Node.js
ai/ # Microservicio de IA
.gitignore
README.md


---

## 2) Diseño funcional y de datos

### 2.1 Funcionalidades del MVP
- **CRUD** de tareas (crear, leer, actualizar, borrar)  
- Sugerencia de **prioridad** (`alta`, `media`, `baja`) + **puntuación de confianza** (0–1)  
- Filtrado por estado, etiquetas y fecha límite  
- Interfaz web responsive y limpia

### 2.2 Campos de cada tarea
- **title**: Título de la tarea  
- **description**: Descripción detallada  
- **dueDate**: Fecha límite en formato ISO  
- **estimateMin**: Duración estimada en minutos  
- **tags**: Lista de etiquetas o categorías  
- **status**: `todo`, `doing`, `done`  
- **prioritySuggested**: Valor sugerido por IA  
- **priorityScore**: Grado de confianza (0–1)  
- **createdAt** / **updatedAt**: Timestamps automáticos

### 2.3 Índices recomendados en MongoDB
- Índice por fecha límite (`dueDate`)  
- Índice por estado (`status`)  
- Índice por etiquetas (`tags`)

---

## 3) Creación del proyecto y configuración de Git
1. Crear carpeta raíz del proyecto.  
2. Inicializar repositorio Git con `git init`.  
3. Crear archivo `.gitignore` para excluir dependencias (`node_modules`, entornos virtuales, variables `.env`).  
4. Crear `README.md` inicial con objetivos, stack y arquitectura.  

---

## 4) Configuración de la base de datos (MongoDB Atlas)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).  
2. Crear un **Cluster** gratuito.  
3. En **Database Access**, crear usuario con permisos de `readWrite`.  
4. En **Network Access**, añadir tu IP o permitir `0.0.0.0/0` (solo en desarrollo).  
5. Obtener el **connection string** en formato:

mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/planner?retryWrites=true&w=majority

6. Guardar este valor en una variable de entorno `MONGODB_URI` en el backend.

---

## 5) Backend API (Node.js + Express + Mongoose)
**Objetivo**: Proporcionar endpoints para el CRUD de tareas y una ruta para pedir sugerencias al microservicio de IA.  

### 5.1 Funciones clave
- Conexión a MongoDB Atlas  
- Endpoints CRUD (`GET`, `POST`, `PUT`, `DELETE`)  
- Endpoint `/suggest` que envía datos de una tarea al servicio de IA y guarda la respuesta  
- Validación de datos de entrada  
- Manejo de errores y logging básico

### 5.2 Variables de entorno necesarias
- `PORT`: Puerto para el backend (ej. `4000`)  
- `MONGODB_URI`: URI de conexión a MongoDB Atlas  
- `AI_SERVICE_URL`: URL del microservicio de IA (localhost en desarrollo, URL de hosting en producción)  

---

## 6) Microservicio de IA (Python + FastAPI + scikit-learn)
**Objetivo**: Analizar la información de una tarea y devolver una prioridad sugerida y una puntuación de confianza.  

### 6.1 Lógica
- Recibir datos de tarea (`title`, `description`, `dueDate`, `estimateMin`, `tags`)  
- Calcular horas restantes hasta la fecha límite  
- Usar un modelo entrenado con TF-IDF + regresión logística o similar para predecir prioridad  
- Retornar prioridad (`high`, `medium`, `low`) y probabilidad asociada

### 6.2 Dataset inicial
- Generar datos sintéticos para entrenar un modelo inicial  
- Permitir reentrenar el modelo con tareas reales mediante un endpoint `/train`  

### 6.3 Variables de entorno necesarias
- `PORT`: Puerto para el microservicio (ej. `8000`)

---

## 7) Frontend (React + TailwindCSS)
**Objetivo**: Interfaz intuitiva para gestionar tareas y mostrar sugerencias de prioridad.  

### 7.1 Funcionalidades clave
- Listado de tareas con filtros  
- Formulario para crear y editar tareas  
- Botón para solicitar sugerencia de prioridad a la IA  
- Visualización de prioridad y puntuación en cada tarea  
- Diseño responsive y moderno con TailwindCSS

---

## 8) Integración entre servicios
- El **frontend** hace peticiones HTTP al **backend** (API REST).  
- El **backend** maneja la lógica de negocio y persistencia de datos.  
- Para sugerencias de prioridad, el **backend** llama al **microservicio de IA** y guarda el resultado en MongoDB.  

---

## 9) Despliegue
- **Frontend**: Vercel (conectado a repo GitHub, build de React)  
- **Backend**: Render / Railway / Fly.io (configurar variables de entorno y conexión a MongoDB Atlas)  
- **IA**: Render / Railway / Fly.io (configurar variables de entorno y exponer endpoint público)  
- **Base de datos**: MongoDB Atlas (cluster gratuito)

---

## 10) Estimación de tiempo
- Configuración de entorno y DB: **2.5 h**  
- Backend CRUD: **3 h**  
- Microservicio de IA: **4 h**  
- Integración backend–IA: **1 h**  
- Frontend (UI + lógica): **5 h**  
- Tests y validaciones: **1.5 h**  
- Deploy y pruebas finales: **1.5 h**  

**Total aproximado**: **~19–20 h**

---

## 11) Mejoras futuras
- Añadir autenticación de usuarios  
- Etiquetado automático de tareas  
- Historial de prioridades para análisis  
- Exportación de datos en CSV/Excel  
- Dashboard con gráficos de productividad
