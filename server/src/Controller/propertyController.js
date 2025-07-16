import jwtProvider from "../config/jwtProvider.js";
import propertyService from "../Service/propertyService.js";

//201-created, 200 ok, 204 no content

//View an agents listings using find property where userId matches

const getAllProperties = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let userId = null;
    if (token) {
      try {
        userId = await jwtProvider.getUserIdFromToken(token);
      } catch (error) {
        console.warn(
          "Invalid token, proceeding without user ID:",
          error.message
        );
      }
    }

    const properties = await propertyService.getAllProperties(
      req.query,
      userId
    );
    return res.status(200).send(properties);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let userId = null;
    if (token) {
      try {
        userId = await jwtProvider.getUserIdFromToken(token);
      } catch (error) {
        console.warn(
          "Invalid token, proceeding without user ID:",
          error.message
        );
      }
    }

    const property = await propertyService.getPropertyById(propertyId, userId);
    //  console.log("property control :", property);
    if (!property) {
      return res.status(404).send({ message: "Property not found" });
    }
    return res.status(201).send(property);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const createProperty = async (req, res) => {
  const userId = req.user.id;

  try {
    const property = await propertyService.createProperty(userId, req.body);
    if (!property) {
      return res.status(404).send({ message: "property not created" });
    }
    return res
      .status(201)
      .send({ message: "Property created successfully", property });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProperty = async (req, res) => {
  const userId = req.user.id;
  const propertyId = req.params.id;
  try {
    const updatedProperty = await propertyService.updateProperty(
      userId,
      propertyId,
      req.body
    );
    if (!updatedProperty) {
      return res.status(204).send({ message: "property not updated" });
    }
    return res.status(200).send(updatedProperty);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const deletedProperty = await propertyService.deleteProperty(propertyId);
    res.status(200).send({ message: "Property deleted successfully " });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//property and user id
const saveProperty = async (req, res) => {
  const userId = req.user.id;
  const propertyId = req.body.propertyId;
  //console.log("userId,propertyId", userId, propertyId);
  try {
    let savedProperty = null;
    if (userId) {
      savedProperty = await propertyService.saveProperty(userId, propertyId);
    }

    if (!savedProperty) {
      return res.status(404).send({ message: "saved Property removed" });
    }

    return res.status(201).send(savedProperty);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: error.message });
  }
};

export default {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  saveProperty,
};
