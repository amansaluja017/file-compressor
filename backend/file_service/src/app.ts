import express from "express";
import dotenv from "dotenv";
import connect from "./services/rabbit";

dotenv.config();

const app = express();

connect();

export default app;