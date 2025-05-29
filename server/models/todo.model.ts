import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, "Please enter todo"],
    },

    isMarked: {
      type: Boolean,
      required: true,
    },

    todoColor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("Todo", TodoSchema);

export default TodoModel;
