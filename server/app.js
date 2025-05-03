// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./src/Routes/UserRoute.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import PropertyRoute from "./src/Routes/PropertyRoute.js";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const globalRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 50 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  //Sends status code 429 and the error message
});

// Apply global rate limiter to all routes
app.use(globalRateLimiter);

// routes
app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});
app.use("/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/property", PropertyRoute);

export default app;
