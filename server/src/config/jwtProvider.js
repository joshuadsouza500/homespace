import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }
  //sign expects a payload(obj) thats why we wrap userId in {}
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "48h",
  });
  return token;
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    return decodedToken.userId;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

export default { generateToken, getUserIdFromToken };
