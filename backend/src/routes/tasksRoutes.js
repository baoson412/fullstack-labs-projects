import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controller/tasksControllers.js";

const router = express.Router();

router.get("/", getAllTodos);

router.post("/", createTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
