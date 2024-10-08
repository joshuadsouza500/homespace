import express from "express";
import propertyController from "../Controller/propertyController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);
router.post("/", verifyToken, propertyController.createProperty);
router.put("/:id", verifyToken, propertyController.updateProperty);
router.delete("/:id", verifyToken, propertyController.deleteProperty);

router.post("/saved", verifyToken, propertyController.saveProperty);

export default router;
