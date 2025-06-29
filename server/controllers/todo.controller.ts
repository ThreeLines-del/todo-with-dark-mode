import { NextFunction, Request, Response } from "express";
import TodoModel from "../models/todo.model.js";

// Input validation helper
const validateTodoInput = (body: any) => {
  const errors: string[] = [];

  if (
    !body.todo ||
    typeof body.todo !== "string" ||
    body.todo.trim().length === 0
  ) {
    errors.push("Todo text is required and must be a non-empty string");
  }

  if (body.todoColor && typeof body.todoColor !== "string") {
    errors.push("Todo color must be a string");
  }

  if (body.isMarked !== undefined && typeof body.isMarked !== "boolean") {
    errors.push("isMarked must be a boolean");
  }

  return errors;
};

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
    const validationErrors = validateTodoInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    const todo = await TodoModel.create(req.body);

    res.status(201).json(todo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
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

    const validationErrors = validateTodoInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    const todo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodosList = await TodoModel.find({});

    res.status(200).json(updatedTodosList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
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
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodoList = await TodoModel.find({});

    res.status(200).json(updatedTodoList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
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
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.isMarked = !todo.isMarked;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
