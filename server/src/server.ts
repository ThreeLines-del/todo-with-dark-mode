import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { todosRouter } from "../routes/todo.route.js";

const port: Number = 8080;
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to frontend
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

//routes
app.use("/api/todos", todosRouter);

//connect to database
mongoose
  .connect(
    "REDACTED"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`server running on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("failed to connect to database");
  });
