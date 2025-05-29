import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { todosRouter } from "../routes/todo.route.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
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
if (!mongoUri) {
  console.error("MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`server running on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("failed to connect to database");
  });
