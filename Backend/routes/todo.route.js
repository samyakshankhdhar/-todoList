import express from "express";
import { createTodo , updateTodo , deleteTodo , getTodo } from "../Controller/todo.controller.js";

const router = express.Router();
router.post("/create",createTodo);
router.get("/fetch",getTodo);
router.put("/update/:id",updateTodo);
router.delete("/delete/:id",deleteTodo);
export default router;