import { createContext, useState } from "react";

export interface TodoType {
  id: number;
  todo: string;
  isMarked: boolean;
  todoColor: string;
}

interface TodosContextObjectType {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: TodoType[];
  todoColor: string;
  setTodoColor: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.FormEvent) => void;
  removeTodo: (todoID: number) => void;
  editTodo: (todo: TodoType) => void;
  editingTodoID: number | null;
  cancelEdit: () => void;
  handleMarkedOnClick: (id: number) => void;
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

let count = 1;

function TodosProvider({ children }: Children) {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoColor, setTodoColor] = useState<string>("#51a2ff");
  const [editingTodoID, setEditingTodoID] = useState<number | null>(null);

  function addTodo(e: React.FormEvent) {
    e.preventDefault();

    if (!todo) return;

    if (editingTodoID !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === editingTodoID
            ? { ...t, todo: todo, todoColor: todoColor }
            : t
        )
      );
      setEditingTodoID(null);
    } else {
      setTodos([
        {
          id: count++,
          todo: todo,
          isMarked: false,
          todoColor: todoColor,
        },
        ...todos,
      ]);
    }

    setTodo("");
    setTodoColor("#51a2ff");
  }

  function removeTodo(todoID: number) {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoID));
  }

  function editTodo(todo: TodoType) {
    if (todo.isMarked) return;

    setTodo(todo.todo);
    setTodoColor(todo.todoColor);
    setEditingTodoID(todo.id);
  }

  function cancelEdit() {
    setEditingTodoID(null);
    setTodo("");
    setTodoColor("#51a2ff");
  }

  function handleMarkedOnClick(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...t, isMarked: !t.isMarked } : t))
    );
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
