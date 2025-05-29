import { useContext } from "react";
import { TodosContextObject } from "./TodosContextObject";
import { AiFillDelete } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TodoType } from "../../shared/types/todo";

interface TodoComponentType {
  todo: TodoType;
}

const TodoComponent: React.FC<TodoComponentType> = ({ todo }) => {
  const todoContext = useContext(TodosContextObject);

  return (
    <div
      className={`rounded-md h-15 grid grid-cols-5 w-80 hover:cursor-pointer hover:shadow hover:shadow-gray-600 hover:scale-105 transition duration-200 ease-in-out ${
        todo._id === todoContext.editingTodoID ? "border-blue-500 border" : ""
      }`}
    >
      <div
        style={{ background: todo.todoColor }}
        className="flex justify-center items-center rounded-l-md border-r border-gray-50 dark:border-gray-800 relative"
      >
        <div className="absolute rounded-l-md bg-black top-0 right-0 left-0 bottom-0 opacity-[3%]"></div>

        <h1 className="text-white font-semibold z-10">
          {todo.todo.slice(0, 2).toUpperCase()}
        </h1>
      </div>
      <div
        onClick={() => todoContext.editTodo(todo)}
        className="col-span-3 px-4 flex border-t border-b border-gray-200 dark:border-gray-800 items-center bg-white dark:bg-gray-800"
      >
        <h1 className="text-gray-700 dark:text-gray-100 w-44 truncate">
          {todo.todo}
        </h1>
      </div>
      <div className="flex justify-center items-center bg-white rounded-r-md border-t border-b border-r border-gray-200 dark:bg-gray-800 dark:border-gray-800 gap-2">
        {todoContext.editingTodoID === todo._id && !todo.isMarked ? (
          <button
            onClick={(e) => {
              todoContext.cancelEdit();
              e.stopPropagation();
            }}
            className="text-red-400 hover:text-blue-500 hover:cursor-pointer"
          >
            <ImCancelCircle />
          </button>
        ) : (
          <button
            onClick={(e) => {
              todoContext.removeTodo(todo._id);
              e.stopPropagation();
            }}
            className="text-gray-500 hover:text-blue-500 hover:cursor-pointer"
          >
            <AiFillDelete />
          </button>
        )}

        <button
          onClick={(e) => {
            todoContext.handleMarkedOnClick(todo._id);
            e.stopPropagation();
          }}
          className={`text-gray-500 hover:text-green-400 hover:cursor-pointer ${
            todo.isMarked ? "text-green-600" : ""
          }`}
        >
          <IoCheckmarkCircle />
        </button>
      </div>
    </div>
  );
};

export default TodoComponent;
