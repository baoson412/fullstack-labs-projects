import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt và updatedAt tự động thêm vào
  }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
