import express from "express";
import userController from "../Controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();
//maybe get user's properties and get users saved properties

router.get("/", userController.getAllUser);
router.get("/profile", verifyToken, userController.getUserProfile);
router.put("/profile", verifyToken, userController.updateUserProfile);
router.delete("/profile/", verifyToken, userController.deleteUser);

router.get(
  "/profile/saved",
  verifyToken,
  userController.getUserSavedProperties
);
router.get("/profile/property", verifyToken, userController.getUserProperties);
export default router;
