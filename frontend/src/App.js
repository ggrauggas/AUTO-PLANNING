import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskFormPopUp from "./components/TaskFormPopUp";
import logo from './components/Logo.png'; 
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtrar tareas según el filtro activo y término de búsqueda
  const filteredTasks = tasks.filter(task => {
    // Verificar si las propiedades existen antes de usarlas
    const title = task.title || "";
    const description = task.description || "";
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "completed") return matchesSearch && task.completed;
    if (activeFilter === "pending") return matchesSearch && !task.completed;
    return matchesSearch;
  });

  // Contadores para el dashboard
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      {/* Header con logo y menú de usuario */}
      <header className="app-header">
        <div className="header-left">
          <img
            src={logo} 
            alt="Logo"
            className="logo-img"
          />
          <h1>TaskMaster</h1>
        </div>
        
        <div className="header-right">
          <div className="user-menu">
            <button 
              className="menu-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              ☰
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button className="menu-item">
                  <i className="icon-user"></i> Perfil
                </button>
                <button className="menu-item">
                  <i className="icon-settings"></i> Ajustes
                </button>
                <button className="menu-item">
                  <i className="icon-info"></i> Sobre Nosotros
                </button>
                <button className="menu-item">
                  <i className="icon-logout"></i> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Panel de estadísticas */}
      <div className="dashboard">
        <div className="stat-card">
          <h3>Total Tareas</h3>
          <span className="stat-number">{totalTasks}</span>
        </div>
        <div className="stat-card">
          <h3>Completadas</h3>
          <span className="stat-number completed">{completedTasks}</span>
        </div>
        <div className="stat-card">
          <h3>Pendientes</h3>
          <span className="stat-number pending">{pendingTasks}</span>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="controls-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-buttons">
          <button 
            className={activeFilter === "all" ? "filter-btn active" : "filter-btn"}
            onClick={() => setActiveFilter("all")}
          >
            Todas
          </button>
          <button 
            className={activeFilter === "completed" ? "filter-btn active" : "filter-btn"}
            onClick={() => setActiveFilter("completed")}
          >
            Completadas
          </button>
          <button 
            className={activeFilter === "pending" ? "filter-btn active" : "filter-btn"}
            onClick={() => setActiveFilter("pending")}
          >
            Pendientes
          </button>
        </div>
        
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Añadir Tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <TaskList
        tasks={filteredTasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />

      {/* Modal para añadir tarea */}
      <TaskFormPopUp 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        onTaskCreated={handleTaskCreated} 
      />
    </div>
  );
}