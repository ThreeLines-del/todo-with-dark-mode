import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TodoComponent from "../TodoComponent";
import { TodosContextObject } from "../TodosContextObject";
import { TodoType } from "../../../shared/types/todo";

const mockTodo: TodoType = {
  _id: "1",
  todo: "Test todo",
  isMarked: false,
  todoColor: "#ff0000",
};

const mockMarkedTodo: TodoType = {
  _id: "2",
  todo: "Marked todo",
  isMarked: true,
  todoColor: "#00ff00",
};

const mockContextValue = {
  todo: "",
  setTodo: vi.fn(),
  todos: [],
  todoColor: "#51a2ff",
  setTodoColor: vi.fn(),
  addTodo: vi.fn(),
  removeTodo: vi.fn(),
  editTodo: vi.fn(),
  editingTodoID: null,
  cancelEdit: vi.fn(),
  handleMarkedOnClick: vi.fn(),
};

const renderWithContext = (todo: TodoType, contextOverrides = {}) => {
  const contextValue = { ...mockContextValue, ...contextOverrides };

  return render(
    <TodosContextObject.Provider value={contextValue}>
      <TodoComponent todo={todo} />
    </TodosContextObject.Provider>
  );
};

describe("TodoComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders todo text", () => {
    renderWithContext(mockTodo);

    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("displays todo color initials", () => {
    renderWithContext(mockTodo);

    expect(screen.getByText("TE")).toBeInTheDocument();
  });

  it("applies todo background color", () => {
    renderWithContext(mockTodo);

    const colorDiv = screen.getByText("TE").parentElement;
    expect(colorDiv).toHaveStyle({ background: "#ff0000" });
  });

  it("shows delete button by default", () => {
    renderWithContext(mockTodo);

    const deleteButton = screen.getByRole("button");
    expect(deleteButton).toBeInTheDocument();
  });

  it("shows checkmark button", () => {
    renderWithContext(mockTodo);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2); // delete and checkmark
  });

  it("calls editTodo when todo text is clicked", async () => {
    const user = userEvent.setup();
    const mockEditTodo = vi.fn();

    renderWithContext(mockTodo, { editTodo: mockEditTodo });

    const todoText = screen.getByText("Test todo");
    await user.click(todoText);

    expect(mockEditTodo).toHaveBeenCalledWith(mockTodo);
  });

  it("calls removeTodo when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockRemoveTodo = vi.fn();

    renderWithContext(mockTodo, { removeTodo: mockRemoveTodo });

    const deleteButton = screen.getAllByRole("button")[0];
    await user.click(deleteButton);

    expect(mockRemoveTodo).toHaveBeenCalledWith("1");
  });

  it("calls handleMarkedOnClick when checkmark is clicked", async () => {
    const user = userEvent.setup();
    const mockHandleMarkedOnClick = vi.fn();

    renderWithContext(mockTodo, {
      handleMarkedOnClick: mockHandleMarkedOnClick,
    });

    const checkmarkButton = screen.getAllByRole("button")[1];
    await user.click(checkmarkButton);

    expect(mockHandleMarkedOnClick).toHaveBeenCalledWith("1");
  });

  it("shows cancel button when todo is being edited", () => {
    renderWithContext(mockTodo, { editingTodoID: "1" });

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2); // cancel and checkmark
  });

  it("calls cancelEdit when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const mockCancelEdit = vi.fn();

    renderWithContext(mockTodo, {
      editingTodoID: "1",
      cancelEdit: mockCancelEdit,
    });

    const cancelButton = screen.getAllByRole("button")[0];
    await user.click(cancelButton);

    expect(mockCancelEdit).toHaveBeenCalled();
  });

  it("applies border when todo is being edited", () => {
    renderWithContext(mockTodo, { editingTodoID: "1" });

    const todoContainer = screen.getByText("Test todo").closest("div");
    expect(todoContainer).toHaveClass("border-blue-500", "border");
  });

  it("shows green checkmark for marked todos", () => {
    renderWithContext(mockMarkedTodo);

    const checkmarkButton = screen.getAllByRole("button")[1];
    expect(checkmarkButton).toHaveClass("text-green-600");
  });

  it("prevents editing marked todos", async () => {
    const user = userEvent.setup();
    const mockEditTodo = vi.fn();

    renderWithContext(mockMarkedTodo, { editTodo: mockEditTodo });

    const todoText = screen.getByText("Marked todo");
    await user.click(todoText);

    expect(mockEditTodo).not.toHaveBeenCalled();
  });

  it("truncates long todo text", () => {
    const longTodo: TodoType = {
      ...mockTodo,
      todo: "This is a very long todo text that should be truncated when displayed in the component",
    };

    renderWithContext(longTodo);

    const todoText = screen.getByText(longTodo.todo);
    expect(todoText).toHaveClass("truncate");
  });

  it("stops event propagation on button clicks", async () => {
    const user = userEvent.setup();
    const mockEditTodo = vi.fn();
    const mockRemoveTodo = vi.fn();

    renderWithContext(mockTodo, {
      editTodo: mockEditTodo,
      removeTodo: mockRemoveTodo,
    });

    const deleteButton = screen.getAllByRole("button")[0];
    await user.click(deleteButton);

    // editTodo should not be called when delete button is clicked
    expect(mockEditTodo).not.toHaveBeenCalled();
    expect(mockRemoveTodo).toHaveBeenCalledWith("1");
  });
});
