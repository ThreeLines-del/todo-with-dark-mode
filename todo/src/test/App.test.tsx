import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach, afterEach } from "vitest";
import App from "../App";
import TodosProvider from "../TodosContextObject";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

const mockTodos = [
  {
    _id: "1",
    todo: "Test todo 1",
    isMarked: false,
    todoColor: "#ff0000",
  },
  {
    _id: "2",
    todo: "Test todo 2",
    isMarked: true,
    todoColor: "#00ff00",
  },
];

const AppWithProvider = () => (
  <TodosProvider>
    <App />
  </TodosProvider>
);

describe("App Component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();

    // Mock successful fetch response
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    // Mock localStorage for dark mode
    localStorageMock.getItem.mockReturnValue("false");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main heading", async () => {
    render(<AppWithProvider />);

    expect(screen.getByText("Todo")).toBeInTheDocument();
  });

  it("renders the todo input form", async () => {
    render(<AppWithProvider />);

    expect(screen.getByPlaceholderText("Enter task here")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
  });

  it("loads todos on mount", async () => {
    render(<AppWithProvider />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/api/todos");
    });
  });

  it("displays todos after loading", async () => {
    render(<AppWithProvider />);

    await waitFor(() => {
      expect(screen.getByText("Test todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test todo 2")).toBeInTheDocument();
    });
  });

  it("toggles dark mode", async () => {
    const user = userEvent.setup();
    render(<AppWithProvider />);

    // Initially in light mode
    expect(screen.getByText("Light Mode")).toBeInTheDocument();

    // Click to toggle to dark mode
    const toggleButton = screen.getByText("Light Mode");
    await user.click(toggleButton);

    // Should now show dark mode
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith("darkMode", "true");
  });

  it("remembers dark mode preference from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("true");

    render(<AppWithProvider />);

    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  it("allows adding a new todo", async () => {
    const user = userEvent.setup();

    // Mock successful POST response
    const newTodo = {
      _id: "3",
      todo: "New test todo",
      isMarked: false,
      todoColor: "#51a2ff",
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(newTodo),
      });

    render(<AppWithProvider />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Test todo 1")).toBeInTheDocument();
    });

    // Add new todo
    const input = screen.getByPlaceholderText("Enter task here");
    const submitButton = screen.getByRole("button", { name: "Go" });

    await user.type(input, "New test todo");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/todos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: "New test todo",
            isMarked: false,
            todoColor: "#51a2ff",
          }),
        }
      );
    });
  });

  it("prevents adding empty todo", async () => {
    const user = userEvent.setup();
    render(<AppWithProvider />);

    const submitButton = screen.getByRole("button", { name: "Go" });
    await user.click(submitButton);

    // Should not make API call for empty todo
    expect(mockFetch).toHaveBeenCalledTimes(1); // Only initial load
  });

  it("allows changing todo color", async () => {
    const user = userEvent.setup();
    render(<AppWithProvider />);

    const colorInput = screen.getByDisplayValue("#51a2ff");
    await user.clear(colorInput);
    await user.type(colorInput, "#ff0000");

    expect(colorInput).toHaveValue("#ff0000");
  });

  it("handles fetch error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockFetch.mockRejectedValue(new Error("Network error"));

    render(<AppWithProvider />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    // Should not crash the app
    expect(screen.getByText("Todo")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
