import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js"
import errorHandler from "./middleware/error.middleware.js"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())


app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use(express.static('public'))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todos", todoRouter)

app.use(errorHandler)

export default app;