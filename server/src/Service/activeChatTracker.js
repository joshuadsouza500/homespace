const activeUsers = {};

const addActiveUser = (userId, socketId, chatId) => {
  activeUsers[userId] = { socketId, chatId };
};

const removeActiveUser = (socketId) => {
  for (const userId in activeUsers) {
    if (activeUsers[userId].socketId === socketId) {
      delete activeUsers[userId];
      break;
    }
  }
};

const isUserActive = (userId, chatId) => {
  return activeUsers[userId] && activeUsers[userId].chatId === chatId;
};

const getUserIdBySocketId = (socketId) => {
  for (const userId in activeUsers) {
    if (activeUsers[userId].socketId === socketId) {
      return userId;
    }
  }
  return null; // Return null if not found
};

// Get chatId by socketId
const getChatIdBySocketId = (socketId) => {
  for (const userId in activeUsers) {
    if (activeUsers[userId].socketId === socketId) {
      return activeUsers[userId].chatId;
    }
  }
  return null; // Return null if not found
};

export default {
  addActiveUser,
  removeActiveUser,
  isUserActive,
  getUserIdBySocketId,
  getChatIdBySocketId,
};
