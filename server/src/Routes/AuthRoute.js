import express from "express";
import authController from "../Controller/authController.js";
import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 6, // Limit each IP to 5 login attempts per windowMs
  message: "Too many login attempts, please try again after 5 minutes.",
  //Sends a 429 status code
});

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/signin", loginRateLimiter, authController.signin);

export default router;
