import express from "express";
import {
  addTodo,
  deleteTodoById,
  getAllTodos,
  toggleIsMarked,
  updateTodoById,
} from "../controllers/todo.controller.js";
export const todosRouter = express.Router();

// get all todos
todosRouter.get("/", getAllTodos);

// add todo
todosRouter.post("/", addTodo);

// update todo
todosRouter.put("/:id", updateTodoById);

// delete todo
todosRouter.delete("/:id", deleteTodoById);

//toggle isMarked
todosRouter.patch("/:id/mark", toggleIsMarked);
