import prisma from "../lib/Prisma.js";
import propertyService from "../Service/propertyService.js";
import userService from "../Service/userService.js";

const getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];

    if (!jwt) {
      return res.status(404).send({ error: "Token not found" });
    }

    const user = await userService.getUserProfileFromToken(jwt);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  const userId = req.user.id;

  const updatedData = req.body;
  // console.log(userId, updatedData);
  try {
    const updatedUser = await userService.updateUser(userId, updatedData); // Pass userId and updated data into the service function
    if (!updatedUser) {
      res.status(500).send({ message: "Failed to update!" });
    }
    res
      .status(200)
      .send({ message: "User profile updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to update user profile!" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const deletedUser = await userService.deleteUser(userId);
    res.status(200).send({ message: "User deleted successfully " });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete user!" });
  }
};

//
const getUserSavedProperties = async (req, res) => {
  const userId = req.user.id;
  try {
    const savedProperties = await userService.getUserSavedProperties(userId);

    return res.status(200).send(savedProperties);
  } catch (error) {
    res.status(500).send({ message: "Failed to get user's saved properties!" });
  }
};
const getUserProperties = async (req, res) => {
  const userId = req.user.id;
  try {
    const userProperties = await userService.getUserProperties(userId);

    return res.status(200).send(userProperties);
  } catch (error) {
    res.status(500).send({ message: "Failed to get user's properties!" });
  }
};
// Get users chats
const getUserChats = async (req, res) => {
  const userId = req.user.id;
  try {
    const userChats = await userService.getUserChats(userId);

    return res.status(200).send(userChats);
  } catch (error) {
    res.status(500).send({ message: "Failed to get user's chats!" });
  }
};

const getOrCreateChat = async (req, res) => {
  const userId = req.user.id;
  const otherParticipant = req.body.otherParticipant;
  const chatId = req.params.id;

  try {
    let userChat;

    // If a chatId is provided, try to fetch the chat by ID
    if (chatId) {
      const result = await userService.getUserChatById(userId, chatId);
      userChat = result.chat; // Destructure chat
    }

    // If no chatId is provided or the chat with the provided ID does not exist
    if (!userChat && otherParticipant) {
      // Now check if a chat already exists between the user and the other participant
      userChat = await prisma.chat.findFirst({
        where: {
          participantsIds: {
            has: userId,
            has: otherParticipant,
          },
        },
        include: {
          participants: true,
          messages: true,
        },
      });
    }

    // If still no chat found, create a new chat
    if (!userChat && otherParticipant) {
      userChat = await userService.addChat(userId, otherParticipant);
    }

    return res.status(200).send({ chat: userChat });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).send({ message: "Failed to get or create chat!" });
  }
};

const deleteChat = async (req, res) => {
  const userId = req.user.id;
  const chatId = req.params.id;

  try {
    const deletedChat = await userService.deleteChat(userId, chatId);
    return res.status(200).send(deletedChat);
  } catch (error) {
    res.status(500).send({ message: "Failed to delete chat!" });
  }
};

const addMessage = async (req, res) => {
  const userId = req.user.id;
  const chatId = req.params.id;
  const message = req.body.message;
  try {
    const newMessage = await userService.addMessage(userId, chatId, message);
    return res.status(200).send(newMessage);
  } catch (error) {
    res.status(500).send({ message: "Failed to add message!" });
  }
};
const deleteMessage = async (req, res) => {
  const userId = req.user.id;
  const chatId = req.params.id;
  const messageId = req.body.messageId;
  try {
    const message = await userService.addMessage(userId, chatId, messageId);
    return res.status(200).send(message);
  } catch (error) {
    res.status(500).send({ message: "Failed to delete message!" });
  }
};

export default {
  getAllUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserSavedProperties,
  getUserProperties,
  getUserChats,
  getOrCreateChat,
  deleteChat,
  addMessage,
  deleteMessage,
};
