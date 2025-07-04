import express from "express";
import { login, logout, register, updatePassword, verifyUser } from "../controllers/user.controllers";
import { verifyJwt } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete(verifyJwt, logout);
router.route("/get-otp").post(verifyUser);
router.route("/update-password").patch(updatePassword);

export default router;