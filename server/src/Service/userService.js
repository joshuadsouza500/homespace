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

// Get users chats
// Get users chat by id

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
};
