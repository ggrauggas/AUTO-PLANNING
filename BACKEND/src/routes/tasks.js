import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// 📌 GET todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// 📌 POST crear tarea
router.post("/", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const task = new Task({ title, description, priority });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Error al crear la tarea" });
  }
});

// 📌 PUT actualizar tarea (cualquier campo)
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar la tarea" });
  }
});

// 📌 PATCH cambiar estado (pendiente ↔ completado)
router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    task.status = task.status === "pending" ? "completed" : "pending";
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Error al cambiar el estado" });
  }
});

// 📌 DELETE eliminar tarea
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar la tarea" });
  }
});

export default router;
