// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./src/Routes/UserRoute.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import PropertyRoute from "./src/Routes/PropertyRoute.js";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});
app.use("/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/property", PropertyRoute);

export default app;
