import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import prisma from "./src/lib/Prisma.js";
import UserRoute from "./src/Routes/UserRoute.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import PropertyRoute from "./src/Routes/PropertyRoute.js";
import { Server } from "socket.io";
import userService from "./src/Service/userService.js";

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

//http.createServer(app); //creates a new https server and says express is used to handle req and res

async function main() {
  await checkDatabaseConnection();

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    //A node http.Server is returned, with this application (which is a Function) as its callback
    console.log(`Server running on port ${PORT}`);
  });
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
      ],
      methods: ["GET", "POST"], //specify method
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (chatId, userId) => {
      socket.join(chatId);
      console.log(`${userId} with Socket ${socket.id} joined room ${chatId}`);
    });

    socket.on("sendMessage", async ({ userId, chatId, message }) => {
      try {
        const newMessage = await userService.addMessage(
          userId,
          chatId,
          message
        );

        // Emit the message to all users in the chat room
        io.to(chatId).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

main()
  .catch((e) => {
    console.error("Error in main execution:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});

//routes

app.use("/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/property", PropertyRoute);

{
  /** Function to initialize exisitng users with empty chats array
async function addChatsToExistingUsers() {
  const users = await prisma.user.findMany();

  // Update each user to initialize the `chats` array if not already set
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: { chatIds: [] }, //In MongoDB, relations are not stored as direct array references. Instead, you need to store IDs explicitly in an array (chatIds) and reference them in Prisma.
    });
  }

  console.log("All users updated with empty chats array");
}  
*/
}
