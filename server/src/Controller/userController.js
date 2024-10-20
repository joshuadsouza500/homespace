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

export default {
  getAllUser,
  getUserProfile,
  updateUserProfile,

  deleteUser,
  getUserSavedProperties,
  getUserProperties,
};
