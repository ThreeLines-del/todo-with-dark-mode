import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import TodoModel from "../models/todo.model.js";
import { todosRouter } from "../routes/todo.route.js";

const app = express();
app.use(express.json());
app.use("/api/todos", todosRouter);

describe("Todo Controller", () => {
  beforeEach(async () => {
    await TodoModel.deleteMany({});
  });

  describe("GET /api/todos", () => {
    it("should return empty array when no todos exist", async () => {
      const response = await request(app).get("/api/todos");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return all todos", async () => {
      const testTodos = [
        { todo: "Test todo 1", isMarked: false, todoColor: "#ff0000" },
        { todo: "Test todo 2", isMarked: true, todoColor: "#00ff00" },
      ];

      await TodoModel.create(testTodos);

      const response = await request(app).get("/api/todos");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].todo).toBe("Test todo 1");
      expect(response.body[1].todo).toBe("Test todo 2");
    });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const newTodo = {
        todo: "New test todo",
        isMarked: false,
        todoColor: "#0000ff",
      };

      const response = await request(app).post("/api/todos").send(newTodo);

      expect(response.status).toBe(201);
      expect(response.body.todo).toBe(newTodo.todo);
      expect(response.body.isMarked).toBe(newTodo.isMarked);
      expect(response.body.todoColor).toBe(newTodo.todoColor);
      expect(response.body._id).toBeDefined();
    });

    it("should return 400 when todo text is missing", async () => {
      const invalidTodo = {
        isMarked: false,
        todoColor: "#0000ff",
      };

      const response = await request(app).post("/api/todos").send(invalidTodo);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Todo text is required");
    });

    it("should return 400 when todo text is empty", async () => {
      const invalidTodo = {
        todo: "",
        isMarked: false,
        todoColor: "#0000ff",
      };

      const response = await request(app).post("/api/todos").send(invalidTodo);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Todo text is required");
    });

    it("should return 400 when todoColor is not a string", async () => {
      const invalidTodo = {
        todo: "Valid todo",
        isMarked: false,
        todoColor: 123,
      };

      const response = await request(app).post("/api/todos").send(invalidTodo);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Todo color must be a string");
    });

    it("should return 400 when isMarked is not a boolean", async () => {
      const invalidTodo = {
        todo: "Valid todo",
        isMarked: "false",
        todoColor: "#0000ff",
      };

      const response = await request(app).post("/api/todos").send(invalidTodo);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("isMarked must be a boolean");
    });
  });

  describe("PUT /api/todos/:id", () => {
    it("should update an existing todo", async () => {
      const todo = await TodoModel.create({
        todo: "Original todo",
        isMarked: false,
        todoColor: "#ff0000",
      });

      const updatedData = {
        todo: "Updated todo",
        isMarked: true,
        todoColor: "#00ff00",
      };

      const response = await request(app)
        .put(`/api/todos/${todo._id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      const updatedTodo = response.body.find(
        (t: any) => t._id.toString() === todo._id.toString()
      );
      expect(updatedTodo.todo).toBe(updatedData.todo);
      expect(updatedTodo.isMarked).toBe(updatedData.isMarked);
      expect(updatedTodo.todoColor).toBe(updatedData.todoColor);
    });

    it("should return 404 when todo does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const updatedData = {
        todo: "Updated todo",
        isMarked: true,
        todoColor: "#00ff00",
      };

      const response = await request(app)
        .put(`/api/todos/${nonExistentId}`)
        .send(updatedData);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Todo not found");
    });

    it("should return 400 when validation fails", async () => {
      const todo = await TodoModel.create({
        todo: "Original todo",
        isMarked: false,
        todoColor: "#ff0000",
      });

      const invalidData = {
        todo: "",
        isMarked: true,
        todoColor: "#00ff00",
      };

      const response = await request(app)
        .put(`/api/todos/${todo._id}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Todo text is required");
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should delete an existing todo", async () => {
      const todo = await TodoModel.create({
        todo: "Todo to delete",
        isMarked: false,
        todoColor: "#ff0000",
      });

      const response = await request(app).delete(`/api/todos/${todo._id}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      const deletedTodo = response.body.find(
        (t: any) => t._id.toString() === todo._id.toString()
      );
      expect(deletedTodo).toBeUndefined();
    });

    it("should return 404 when todo does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app).delete(`/api/todos/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Todo not found");
    });
  });

  describe("PATCH /api/todos/:id/mark", () => {
    it("should toggle isMarked from false to true", async () => {
      const todo = await TodoModel.create({
        todo: "Todo to mark",
        isMarked: false,
        todoColor: "#ff0000",
      });

      const response = await request(app).patch(`/api/todos/${todo._id}/mark`);

      expect(response.status).toBe(200);
      expect(response.body.isMarked).toBe(true);
      expect(response.body._id.toString()).toBe(todo._id.toString());
    });

    it("should toggle isMarked from true to false", async () => {
      const todo = await TodoModel.create({
        todo: "Todo to unmark",
        isMarked: true,
        todoColor: "#ff0000",
      });

      const response = await request(app).patch(`/api/todos/${todo._id}/mark`);

      expect(response.status).toBe(200);
      expect(response.body.isMarked).toBe(false);
      expect(response.body._id.toString()).toBe(todo._id.toString());
    });

    it("should return 404 when todo does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app).patch(
        `/api/todos/${nonExistentId}/mark`
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Todo not found");
    });
  });
});
