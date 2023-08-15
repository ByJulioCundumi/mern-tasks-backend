import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import {getTasks, getTask, postTask, putTask, deleteTask} from "../controllers/task.controller.js";

const router = Router()

router.get("/task", validateToken, getTasks)
router.get("/task/:id", validateToken, getTask)
router.post("/task", validateToken, postTask)
router.put("/task/:id", validateToken, putTask)
router.delete("/task/:id", validateToken, deleteTask)

export default router;