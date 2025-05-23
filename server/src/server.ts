import express from "express";
import cors from "cors";

export interface TodoType {
  id: number;
  todo: string;
  isMarked: boolean;
  todoColor: string;
}

const todos: TodoType[] = [
  {
    id: 1,
    todo: "Do chores",
    isMarked: false,
    todoColor: "#51a2ff",
  },
  {
    id: 2,
    todo: "Visit the park",
    isMarked: false,
    todoColor: "#51a2ff",
  },
  {
    id: 3,
    todo: "Go to the bar",
    isMarked: false,
    todoColor: "#51a2ff",
  },
];

let nextId = Math.max(...todos.map((t) => t.id)) + 1;

const port: Number = 8080;
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

// get all todos
app.get("/api/todos", (req, res, next) => {
  res.status(200).json(todos);
});

// add todo
app.post("/api/todos", (req, res, next) => {
  const newTodo: TodoType = {
    id: nextId++,
    todo: req.body.todo,
    isMarked: false,
    todoColor: req.body.todoColor,
  };

  if (!newTodo) return;

  todos.push(newTodo);
  res.status(201).json(todos);
});

// update todo
app.put("/api/todos/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    const error = new Error(`Todo not found`);
    return next(error);
  }

  todo.todo = req.body.todo;
  todo.todoColor = req.body.todoColor;
  res.status(200).json(todos);
});

// delete todo
app.delete("/api/todos/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    const error = new Error(`Todo not found`);
    return next(error);
  }

  todos.splice(index, 1);
  res.status(200).json(todos);
});

//toggle isMarked
app.patch("/api/todos/:id/mark", (req, res, next) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    const error = new Error(`Todo not found`);
    return next(error);
  }

  todo.isMarked = !todo.isMarked;
  res.status(200).json(todos);
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
