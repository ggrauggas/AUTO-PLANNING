// Importar dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Inicializar la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const tasksRouter = require("./routes/tasks");
app.use("/tasks", tasksRouter);


// Variables de entorno
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
