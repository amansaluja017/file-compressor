import express from "express";
import dotenv from "dotenv";
import expressProxy from "express-http-proxy";
import path from "path";

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Proxy to the backend service
app.use(
  "/users",
  expressProxy(process.env.USER_SERVICE_URL || "http://localhost:3001")
);

app.use(
  "/files",
  expressProxy(process.env.FILE_SERVICE_URL || "http://localhost:3002")
);

export default app;