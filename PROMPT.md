# Prompt de contexto para IA — Proyecto "Planificador Inteligente de Tareas"

Quiero que actúes como un **asistente experto en desarrollo full-stack e IA** para ayudarme en la construcción de un proyecto.  
El proyecto se llama **"Planificador Inteligente de Tareas"** y debe cumplir con lo siguiente:

---

## 🎯 Objetivo del proyecto
Construir una aplicación web que permita gestionar tareas personales o profesionales, incorporando un microservicio de **IA** capaz de sugerir la prioridad de cada tarea (alta, media, baja) en función de:
- Fecha límite  
- Duración estimada  
- Etiquetas y contenido textual de la tarea  

---

## 🏗 Arquitectura general
El proyecto está dividido en **tres módulos principales**, cada uno independiente:

portfolio-planner/
│
├── frontend/ → Aplicación web con React + TailwindCSS
├── backend/ → API REST con Node.js + Express + Mongoose
├── ai/ → Microservicio de IA con Python + FastAPI + scikit-learn
├── .gitignore → Exclusiones de Git (node_modules, .env, pycache, etc.)
├── README.md → Documentación principal del proyecto
└── LICENSE → (Opcional) Licencia del proyecto

markdown
Copiar
Editar

---

## 📌 Detalles de cada módulo

### 1. Frontend (React + TailwindCSS)
- Mostrar listado de tareas, formulario de creación/edición.  
- Botón para solicitar sugerencia de prioridad a la IA.  
- Filtros por estado, etiquetas y fecha límite.  
- Interfaz moderna, limpia y responsive.  

### 2. Backend (Node.js + Express + Mongoose)
- Endpoints CRUD (`GET`, `POST`, `PUT`, `DELETE`) para tareas.  
- Endpoint `/suggest` que conecta con el microservicio de IA.  
- Validación de datos y manejo de errores.  
- Conexión a **MongoDB Atlas** como base de datos principal.  

### 3. Microservicio de IA (Python + FastAPI)
- Recibe los datos de una tarea y devuelve prioridad sugerida + score (0–1).  
- Modelo inicial entrenado con datos sintéticos (TF-IDF + regresión logística).  
- Futuro: endpoint `/train` para reentrenar con datos reales.  

---

## 🗄 Modelo de datos (MongoDB)
Cada tarea tendrá los siguientes campos:  
- `title`: título de la tarea  
- `description`: descripción  
- `dueDate`: fecha límite  
- `estimateMin`: duración estimada en minutos  
- `tags`: lista de etiquetas  
- `status`: `todo`, `doing`, `done`  
- `prioritySuggested`: prioridad sugerida por IA  
- `priorityScore`: puntuación de confianza (0–1)  
- `createdAt`, `updatedAt`: timestamps automáticos  

Índices recomendados:  
- `dueDate` (para ordenar por fecha límite)  
- `status` (para filtrar por estado)  
- `tags` (para búsquedas por categoría)  

---

## ☁️ Despliegue
- **Frontend** → Vercel  
- **Backend** → Render / Railway / Fly.io  
- **IA** → Render / Railway / Fly.io  
- **Base de datos** → MongoDB Atlas (cluster gratuito)

---

## ⏱ Estimación de tiempos
- Configuración inicial: 2.5h  
- Backend CRUD: 3h  
- Microservicio IA: 4h  
- Integración backend–IA: 1h  
- Frontend: 5h  
- Tests y validaciones: 1.5h  
- Deploy y pruebas finales: 1.5h  

**Total aproximado: ~19–20 horas**

---

## ✅ Expectativa de la IA
A partir de este contexto, quiero que actúes como **mentor técnico** que me guíe en:  
1. Escribir código bien estructurado y modular.  
2. Proponer mejoras de arquitectura y buenas prácticas.  
3. Ayudar en la integración entre frontend, backend e IA.  
4. Asesorar sobre despliegue en plataformas cloud.  
5. Sugerir optimizaciones y mejoras futuras.