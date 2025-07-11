import prisma from "./src/lib/Prisma.js";
import { Server } from "socket.io";
import userService from "./src/Service/userService.js";
import activeChatTracker from "./src/Service/activeChatTracker.js";
import app from "./app.js";

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
        "https://homespace-bh.onrender.com",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
      ],
      methods: ["GET", "POST"], //specify method
    },
  });

  io.on("connection", (socket) => {
    //console.log("User connected:", socket.id,);

    socket.on("joinRoom", (chatId, userId) => {
      socket.join(chatId);
      activeChatTracker.addActiveUser(userId, socket.id, chatId); //Ads the id to activeUsers oj
      io.to(chatId).emit("userJoined", { userId }); //Emits a userJoined to all connected
      //console.log(`${userId} with Socket ${socket.id} joined room ${chatId}`);
    });

    socket.on("sendMessage", async ({ userId, chatId, message }) => {
      try {
        io.to(chatId).emit("userJoined", { userId }); //This makes sure the status gets updated for both sides
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
      // console.log(`Socket disconnected: ${socket.id}`);
      const userId = activeChatTracker.getUserIdBySocketId(socket.id);
      const chatId = activeChatTracker.getChatIdBySocketId(socket.id);

      if (userId && chatId) {
        activeChatTracker.removeActiveUser(socket.id);
        io.to(chatId).emit("userLeft", { userId }); // Notify all participants that the user left
        //  console.log(`User ${userId} left room ${chatId}`);
      }
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
