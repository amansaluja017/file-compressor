import express from "express";
import dotenv from "dotenv";
import expressProxy from "express-http-proxy";
import path from "path";

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))

// Proxy to the backend service
app.use(
  "/users",
  expressProxy(process.env.USER_SERVICE_URL || "http://localhost:3001")
);

app.use(
  "/files",
  expressProxy(process.env.FILE_SERVICE_URL || "http://localhost:3002", {
    limit: "50mb",
  })
);

export default app;