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

export default {
  addActiveUser,
  removeActiveUser,
  isUserActive,
};
