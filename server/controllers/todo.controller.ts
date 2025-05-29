import { NextFunction, Request, Response } from "express";
import TodoModel from "../models/todo.model.js";

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await TodoModel.find({});

    res.status(200).json(todos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await TodoModel.create(req.body);

    res.status(200).json(todo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const updateTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const todo = await TodoModel.findByIdAndUpdate(id, req.body);

    if (!todo) {
      res.status(404).json({ messgae: "Product not found" });
    }

    const updatedTodosList = await TodoModel.find({});

    res.status(200).json(updatedTodosList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).json({ messgae: "Product not found" });
    }

    const updatedTodoList = await TodoModel.find({});

    res.status(200).json(updatedTodoList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const toggleIsMarked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const todo = await TodoModel.findById(id);

    if (!todo) {
      res.status(404).json({ messgae: "Product not found" });
    } else {
      todo.isMarked = !todo.isMarked;

      await todo.save();

      res.status(200).json(todo);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
