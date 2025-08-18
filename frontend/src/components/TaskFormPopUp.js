// src/components/TaskFormPopup.js
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function TaskFormPopup({ open, handleClose, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

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
      setPriority("medium");
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f9f9f9",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Añadir Nueva Tarea</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
        >
          <MenuItem value="low">Baja</MenuItem>
          <MenuItem value="medium">Media</MenuItem>
          <MenuItem value="high">Alta</MenuItem>
        </Select>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Añadir Tarea
        </Button>
      </Box>
    </Modal>
  );
}
