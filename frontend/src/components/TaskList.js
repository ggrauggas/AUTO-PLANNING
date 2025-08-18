import axios from "axios";

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const toggleStatus = async (task) => {
    try {
      const res = await axios.put(`http://localhost:4000/tasks/${task._id}`, {
        ...task,
        status: task.status === "pending" ? "completed" : "pending",
      });
      onTaskUpdated(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${taskId}`);
      onTaskDeleted(taskId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`task-card ${task.priority} ${task.status}`}
        >
          <button className="delete-btn" onClick={() => deleteTask(task._id)}>
            🗑
          </button>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            <strong>Prioridad:</strong> {task.priority}
          </p>
          <p>
            <strong>Estado:</strong> {task.status}
          </p>
          <button onClick={() => toggleStatus(task)}>
            {task.status === "pending" ? "✅ Finalizar" : "↩️ Reabrir"}
          </button>
        </div>
      ))}
    </div>
  );
}
