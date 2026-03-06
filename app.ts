import express from "express";
import cors from "cors";
import { createTodo, getTodos } from "./database.js";

const app = express();
app.use(cors());

app.use(express.static("public"));
app.use(express.json());

app.get("/todos", (req, res) => {
  const todos = getTodos();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  try {
    await createTodo(title);
    res.status(200).json({ error: null });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert in database" });
  }
});

app.listen(8085, () => {
  console.log("Server is running");
});
