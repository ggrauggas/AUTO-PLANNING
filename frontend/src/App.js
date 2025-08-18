import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((t) => t._id !== taskId));
  };

  return (
    <div className="app">
      <h1>📋 Gestor de Tareas</h1>
      <button className="add-btn" onClick={() => setShowForm(true)}>
        ➕ Añadir Tarea
      </button>

      <TaskList
        tasks={tasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowForm(false)}>
              ✖
            </button>
            <h2>Nueva Tarea</h2>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        </div>
      )}
    </div>
  );
}

