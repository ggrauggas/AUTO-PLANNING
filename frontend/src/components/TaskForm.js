import { useState } from "react";
import axios from "axios";

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/tasks", {
        title,
        description,
        priority,
      });
      onTaskCreated(res.data);
      setTitle("");
      setDescription("");
      setPriority("low");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <button type="submit">✅ Guardar</button>
    </form>
  );
}
