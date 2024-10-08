import propertyService from "../Service/propertyService.js";

//201-created, 200 ok, 204 no content
const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties(req.query);
    return res.status(200).send(properties);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const property = await propertyService.getPropertyById(propertyId);
    if (!property) {
      return res.status(500).send({ message: "Property not found" });
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
      return res.status(500).send({ message: "property not created" });
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

  try {
    const savedProperty = await propertyService.saveProperty(
      userId,
      propertyId
    );
    if (savedProperty.message == "Property saved successfully") {
      res.status(201).send({ message: "Property saved successfully " });
    } else {
      res
        .status(200)
        .send({ message: " Property removed from saved propereties" });
    }
  } catch (error) {
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
