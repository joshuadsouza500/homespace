import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "./src/lib/Prisma.js";
import UserRoute from "./src/Routes/UserRoute.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import PropertyRoute from "./src/Routes/PropertyRoute.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Check the database connection when the server starts
async function checkDatabaseConnection() {
  try {
    // This query is a no-op (it doesn't retrieve any data but checks the connection)
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit if the connection fails
  }
}

app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});

//routes

app.use("/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/property", PropertyRoute);

async function main() {
  await checkDatabaseConnection();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main()
  .catch((e) => {
    console.error("Error in main execution:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
