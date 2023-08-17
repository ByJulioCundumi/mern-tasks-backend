import express from "express"
import cors from "cors"
import morgan from "morgan" 
import AuthRoutes from "./routes/auth.routes.js"
import TaskRoutes from "./routes/task.routes.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))
//
app.use("/api", AuthRoutes)
app.use("/api", TaskRoutes)
//
export default app;
