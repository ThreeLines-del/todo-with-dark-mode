import { createContext, useEffect, useState } from "react";
import { TodoType } from "../../shared/types/todo";

interface TodosContextObjectType {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: TodoType[];
  todoColor: string;
  setTodoColor: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.FormEvent) => void;
  removeTodo: (todoID: string) => void;
  editTodo: (todo: TodoType) => void;
  editingTodoID: string | null;
  cancelEdit: () => void;
  handleMarkedOnClick: (id: string) => void;
}

interface Children {
  children: React.ReactNode;
}

export const TodosContextObject = createContext<TodosContextObjectType>({
  todo: "",
  setTodo: () => {},
  todos: [],
  todoColor: "",
  setTodoColor: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
  editingTodoID: null,
  cancelEdit: () => {},
  handleMarkedOnClick: () => {},
});

function TodosProvider({ children }: Children) {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoColor, setTodoColor] = useState<string>("#51a2ff");
  const [editingTodoID, setEditingTodoID] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error response");
        }

        return response.json();
      })
      .then((data) => setTodos(data));
  }, []);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();

    if (!todo) return;

    if (editingTodoID !== null) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/todos/${editingTodoID}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              todo: todo,
              todoColor: todoColor,
            }),
          }
        );

        const data: TodoType[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: todo,
            isMarked: false,
            todoColor: todoColor,
          }),
        });

        if (!response.ok) {
          throw new Error("Error response");
        }

        const data: TodoType = await response.json();
        setTodos((prevTodos) => [...prevTodos, data]);
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }

    setTodo("");
    setTodoColor("#51a2ff");
  }

  async function removeTodo(todoID: String) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/todos/${todoID}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Error response");
      }

      const data: TodoType[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.log("failed to delete todo", error);
    }
  }

  function editTodo(todo: TodoType) {
    if (todo.isMarked) return;

    setTodo(todo.todo);
    setTodoColor(todo.todoColor);
    setEditingTodoID(todo._id);
  }

  function cancelEdit() {
    setEditingTodoID(null);
    setTodo("");
    setTodoColor("#51a2ff");
  }

  async function handleMarkedOnClick(id: String) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/todos/${id}/mark`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle marked");
      }

      const data: TodoType = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === data._id ? { ...t, isMarked: data.isMarked } : t
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  }

  const contextObj = {
    todo: todo,
    setTodo: setTodo,
    todos: todos,
    todoColor: todoColor,
    setTodoColor: setTodoColor,
    addTodo: addTodo,
    removeTodo: removeTodo,
    editTodo: editTodo,
    editingTodoID: editingTodoID,
    cancelEdit: cancelEdit,
    handleMarkedOnClick: handleMarkedOnClick,
  };

  return (
    <TodosContextObject.Provider value={contextObj}>
      {children}
    </TodosContextObject.Provider>
  );
}

export default TodosProvider;
