import express from "express";
import { login, logout, register } from "../controllers/user.controllers";
import { verifyJwt } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete(verifyJwt, logout);

export default router;