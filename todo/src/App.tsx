import { useContext, useEffect, useState } from "react";
import "./App.css";
import { TodosContextObject } from "./TodosContextObject";
import TodoComponent from "./TodoComponent";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

function App() {
  const todoContext = useContext(TodosContextObject);
  const todos = todoContext.todos;
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen p-5 relative dark:bg-gray-800 transition-colors">
      {darkMode ? (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex gap-5 justify-center items-center text-gray-100 text-sm absolute right-0 top-0 m-5"
        >
          Dark Mode
          <span>
            <MdDarkMode className="scale-110 text-gray-100 hover:scale-150 hover:text-blue-400 hover:cursor-pointer transition ease-in-out duration-300" />
          </span>
        </button>
      ) : (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex gap-5 justify-center items-center text-gray-800 text-sm absolute right-0 top-0 m-5"
        >
          Light Mode
          <span>
            <MdOutlineLightMode className="scale-125 text-gray-600 hover:scale-150 hover:text-blue-400 hover:cursor-pointer transition ease-in-out duration-300" />
          </span>
        </button>
      )}

      <div className="flex justify-center items-center mt-10">
        <h1 className="text-4xl dark:text-gray-100">Todo</h1>
      </div>

      <form
        className="flex gap-2 justify-center items-center relative"
        action=""
        onSubmit={(e) => todoContext.addTodo(e)}
      >
        <input
          className="w-5 absolute right-0 mr-14 rounded-sm"
          type="color"
          value={todoContext.todoColor}
          onChange={(e) => todoContext.setTodoColor(e.target.value)}
        />
        <input
          className="h-12 w-60 rounded-md pl-2 pr-9 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-700 dark:text-gray-100"
          type="text"
          value={todoContext.todo}
          onChange={(e) => todoContext.setTodo(e.target.value)}
          placeholder="Enter task here"
        />
        <button
          type="submit"
          className="rounded-sm px-2 h-12 bg-blue-400 text-white hover:bg-blue-500 hover:cursor-pointer shadow transition ease-in-out duration-300"
        >
          Go
        </button>
      </form>

      <div className="flex-1 rounded-md bg-gray-100 w-[370px] md:w-[700px] lg:w-[1020px] xl:w-[1110px] overflow-y-auto p-5 dark:bg-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {todos.map((todo) => {
            return <TodoComponent key={todo.id} todo={todo} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
