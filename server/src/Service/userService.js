import jwtProvider from "../config/jwtProvider.js";
import prisma from "../lib/Prisma.js";
import bcrypt from "bcrypt";

const createUser = async (reqData) => {
  //hashpassword and create user
  let { name, mobile, email, password, role, company } = reqData;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("User already exists with this email");
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await prisma.user.create({
      data: {
        name,
        mobile,
        email,
        password: hashedPassword,
        role,
        ...(role === "AGENT" && { company }), // spread operator to conditionally add company
      },
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User does not exists with email: ", email);
    }
    // console.log("Login service user:", user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User does not exist: ");
    }
    // console.log(" id user:", user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileFromToken = async (jwt) => {
  try {
    const userId = await jwtProvider.getUserIdFromToken(jwt);

    if (!userId) {
      throw new Error("User Id not found..Invalid Token");
    }
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (userId, reqData) => {
  const { name, mobile, email, password, role, company, avatar } = reqData;
  //const avatar = "https://cdn-icons-png.flaticon.com/128/10643/10643283.png"; // Placeholder for the avatar image

  // Create an object to hold the updated data
  const updateData = {
    name,
    email,
    mobile,
    avatar,
    role,
  };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 8);
    updateData.password = hashedPassword; // Add the hashedPassword to the updateData object
  }

  // Conditionally add the company if the role is AGENT
  if (role === "AGENT" && company) {
    updateData.company = company; // Add the company field to updateData
  } else {
    updateData.company = null;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData, // Pass the entire updateData object
    });
    return updatedUser; // Return the updated user object
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Could not update user data."); // Throw an error to be caught in the controller
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    // Delete the user from the database
    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: `User with id ${userId} has been successfully deleted.` };
  } catch (error) {
    throw new Error("Could not delete user.");
  }
};

const getUserSavedProperties = async (userId) => {
  try {
    const savedProperties = await prisma.savedProperty.findMany({
      where: { userId: userId },
      include: { property: true },
    });
    // By adding the include option Prisma fetches and returns Property record alongside the saved property entries.
    if (!savedProperties) {
      throw new Error("No saved properties for this user ");
    }
    return savedProperties.map((savedProperty) => ({
      ...savedProperty.property,
      isSaved: true,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProperties = async (userId) => {
  try {
    const userProperties = await prisma.property.findMany({
      where: { userId: userId },
    });
    console.log("user props", userProperties);
    if (!userProperties) {
      throw new Error("No properties listed by this user ");
    }
    return userProperties;
  } catch (error) {
    throw new Error(error.message);
  }
};
//✅ Use "has" when filtering a scalar list (ids) (e.g., String[], Int[]) to check if a specific value exists in the array. and use some when filtering lists like chat[]
// Get users chats
const getUserChats = async (userId) => {
  try {
    const userChats = await prisma.chat.findMany({
      where: {
        participantsIds: {
          //✅Filters chats where the user is a participant
          has: userId,
        },
      },
      include: {
        participants: true, //Fetches user details of chat participants
        messages: {
          take: 1, // Fetch the latest message if needed
          orderBy: { createdAt: "desc" },
        },
      },
    });
    //console.log("user's chats: ", userChats);
    if (!userChats) {
      throw new Error("No chats found for this user ");
    }
    return userChats;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Get users chat by id
const getUserChatById = async (userId, chatId) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participantsIds: {
          has: userId,
        },
      },
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "desc" }, // Get latest messages first
        },
      },
    });
    // console.log("chat: ", chat);
    if (!chat) {
      throw new Error("No chats found ");
    }

    // Update unreadCounts: Reset unread messages for the current user
    const updatedUnreadCounts = { ...chat.unreadCounts, [userId]: 0 };

    await prisma.chat.update({
      where: { id: chatId },
      data: { unreadCounts: updatedUnreadCounts }, // [userId]: 0, //Overwrites the entire unreadCounts object. so if user2 had unreadcount it would completly remove it, so we need to spread it first then change
    });

    return chat;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addChat = async (userId, otherParticipant) => {
  try {
    const userChat = await prisma.chat.create({
      data: {
        participantsIds: [userId, otherParticipant],
      },
    });
    // console.log("service cretae chat", userChat);
    return userChat;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteChat = async (userId, chatId) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participantsIds: {
          has: userId,
        },
      },
    });
    console.log("ccc", chat);
    if (!chat) {
      throw new Error("Chat not found ");
    }
    //Need to delete all messages first before delteing chat
    //chatId was a foreign key i nthe message so db won't let you delete a chat if there are messages associated with it
    await prisma.message.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    console.log(`Deleted messages associated with chat ID: ${chatId}`);
    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });
    return { message: `Chat with id ${chatId} has been successfully deleted.` };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Adding a new message to a chat
const addMessage = async (userId, chatId, message) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participantsIds: {
          has: userId,
        },
      },
      select: { participantsIds: true, unreadCounts: true }, // Select only the participantsIds and unreadCounts fields reduces db load
    });
    if (!chat) {
      throw new Error("Chat not found ");
    }
    const newMessage = await prisma.message.create({
      data: {
        chatId,
        senderId: userId,
        content: message,
      },
    });
    await prisma.chat.update({
      where: { id: chatId },
      data: {
        lastMessage: message,
        unreadCounts: {
          set: {
            ...(chat.unreadCounts || {}), //spread the exisitng unreadcounts
            [userId]: 0, //reset the senders count to 0
            ...Object.fromEntries(
              //Object.fromEntries converts the array of key-value pairs into an object. so [['user2', 1]] into {user2:1}
              chat.participantsIds
                .filter((id) => id !== userId) // return [user2]
                .map((id) => [id, (chat.unreadCounts?.[id] || 0) + 1]) //checks if there’s an existing unread count for that user (using optional chaining ?.). If it exists, it adds 1
            ),
          },
        },
      },
    });
    console.log("Add message service ", newMessage);
    return newMessage;
  } catch (error) {
    console.error("Error in addMessage:", error); // Logs full error stack
    throw new Error("Failed to send message. Please try again.");
  }
};

const deleteMessage = async (userId, chatId, messageId) => {
  try {
    // Find the chat to ensure the user is a participant
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participantsIds: {
          has: userId, // Make sure the user is part of the chat
        },
      },
    });

    if (!chat) {
      throw new Error("Chat not found or user is not a participant.");
    }
    // Find the message to delete
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });
    if (!message) {
      throw new Error("Message not found.");
    }
    if (message.chatId !== chatId) {
      throw new Error("Message does not belong to the specified chat.");
    }
    // Optionally, you can also check if the user is the sender of the message to allow them to delete their own message
    if (message.senderId !== userId) {
      throw new Error("User can only delete their own messages.");
    }
    // Delete the message
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    return { message: "Message deleted successfully." };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  getUserProfileFromToken,
  getUserSavedProperties,
  getUserProperties,
  getUserChats,
  getUserChatById,
  addChat,
  deleteChat,
  addMessage,
  deleteMessage,
};

// when a chat is created the roomid is un url. get that to create a socketio room. then enter the chat and pass the data to socket io in the add message f

//When new chat is being cretaed. Create the chat in backend and the id gets passed to front end, then from there send the roomId from frontent socket io to socket io in backeded (roomId). ANd these is used to join room

//We will need to add the addmessgawe funtion inside of socket io as the data, chatId and message will be passed from the front end to the backend. and then we will use the chatId to find the chat and then add the message to the chat. and then send the message to the front end using the emit  . to(chatId)
