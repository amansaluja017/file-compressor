import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

export default app;