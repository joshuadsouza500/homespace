import jwtProvider from "../config/jwtProvider.js";
import userService from "../Service/userService.js";

const verifyToken = async (req, res, next) => {
  //when we use split[ it splits bearer and the token ] and using [1] we get the token part
  //["Bearer", "eyJhbGciOiJIU.eyJ1c2VySWQiOiIxMjM0NTY3O.t0ZULuG_7cCjb_URwK"]
  try {
    //console.log(req.headers.authorization?.split(" ")[1]);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).send({ error: "Token not found" });
    }
    const userId = await jwtProvider.getUserIdFromToken(token);
    // console.log("userId", userId);
    const user = await userService.findUserById(userId);
    // console.log("verify token user", user);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    req.user = user;
    console.log("userId", req.user.id);
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default verifyToken;
