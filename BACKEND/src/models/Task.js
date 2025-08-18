import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"], // 🔹 solo acepta estos valores
    default: "medium",
  },
  status: {
    type: String,
    enum: ["pending", "completed"], 
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Task", taskSchema);
