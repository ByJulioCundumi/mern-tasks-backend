import express from "express"
import cors from "cors"
import morgan from "morgan" 
import AuthRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))
//
app.use("/api", AuthRoutes)
//
export default app;
