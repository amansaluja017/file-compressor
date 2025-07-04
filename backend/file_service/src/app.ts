import express from "express";
import dotenv from "dotenv";
import connect from "./services/rabbit";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(cookieParser())

import fileRoutes from "./routes/file.routes"

app.use("/", fileRoutes)

export default app;