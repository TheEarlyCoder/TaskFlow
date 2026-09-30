import { Router } from "express";
import authorizeUser from "../middleware/auth.middleware.js";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js";

const router = Router()

router.post("/create-todo", authorizeUser, createTodo)
router.get("/alltodos", authorizeUser, getAllTodos)
router.patch("/:id", authorizeUser, updateTodo)
router.delete("/:id", authorizeUser, deleteTodo)

export default router;