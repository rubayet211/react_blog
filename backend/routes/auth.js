import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// User logout route
router.post("/logout", logout);

export default router;
