import bcrypt from "bcrypt";
import jwtProvider from "../config/jwtProvider.js";
import userService from "../Service/userService.js";

const signup = async (req, res) => {
  //we generate a token here aswell cause the useris directly navigated to homepage and not need to login again

  try {
    const user = await userService.createUser(req.body);

    console.log("auth controller", user);
    const jwt = await jwtProvider.generateToken(user.id);

    return res.status(200).send({ jwt, user, message: "User Sign up Success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .send({ message: " User not found with  email ", email });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(404).send({ message: " Incorrect password " });
    }
    const jwt = await jwtProvider.generateToken(user.id);

    return res.status(200).send({ jwt, user, message: "User Sign in Success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
//logoout handles on client side just need to remove jwt from local storage

export default { signin, signup };
