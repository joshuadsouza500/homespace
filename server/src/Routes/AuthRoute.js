import express from "express";
import authController from "../Controller/authController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

export default router;
