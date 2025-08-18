import React from "react";
import API from "../api";

function TaskItem({ task, fetchTasks }) {
  const handleDelete = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <strong>{task.title}</strong> - {task.description} 
      <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>❌ Eliminar</button>
    </li>
  );
}

export default TaskItem;
