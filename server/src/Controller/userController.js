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
  console.log(userId, updatedData);
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
{
  /**
// get specific chat
const getChatById = async (req, res) => {
  const userId = req.user.id;
  const chatId = req.params.id;
  try {
    const userChat = await userService.getUserChatById(userId, chatId);

    return res.status(200).send(userChat);
  } catch (error) {
    res.status(500).send({ message: "Failed to get user's chat!" });
  }
};

const addChat = async (req, res) => {
  const userId = req.user.id;
  const propertyListerId = req.body.propertyListerId;
  try {
    const userChat = await userService.addChat(userId, propertyListerId);
    return res.status(200).send(userChat);
  } catch (error) {
    res.status(500).send({ message: "Failed to create chat!" });
  }
};
 */
}

const getOrCreateChat = async (req, res) => {
  const userId = req.user.id;
  const propertyListerId = req.body.propertyListerId;
  const chatId = req.params.id;

  try {
    let userChat;
    // If chatId is provided, try to fetch the chat by ID
    if (chatId) {
      userChat = await userService.getUserChatById(userId, chatId);
    }
    // If no chatId is provided or chat does not exist, create a new chat
    if (!userChat && propertyListerId) {
      userChat = await userService.addChat(userId, propertyListerId);
    }
    return res.status(200).send(userChat);
  } catch (error) {
    res.status(500).send({ message: "Failed to get or create chat!" });
  }
};

const deleteChat = async (req, res) => {
  const userId = req.user.id;
  try {
    const deletedChat = await userService.deleteChat(userId);
    return res.status(200).send(deletedChat);
  } catch (error) {
    res.status(500).send({ message: "Failed to delete chat!" });
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
};
