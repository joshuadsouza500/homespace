import prisma from "../lib/Prisma.js";

const createProperty = async (userId, reqData) => {
  const {
    title,
    description,
    price,
    location,
    city,
    longitude,
    latitude,
    image,
    bedrooms,
    bathrooms,
    area,
    type,
    property_type,
    utilities,
    furnishing,
    amenities,
  } = reqData;
  try {
    // console.log("prop reqdata", reqData);
    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price,
        location,
        city,
        longitude,
        latitude,
        image,
        bedrooms,
        bathrooms,
        area,
        type,
        property_type,
        utilities,
        furnishing,
        amenities,
        userId,
      },
    });
    // console.log("prop ", newProperty);
    return newProperty;
  } catch (error) {
    throw new Error("Could not create property: " + error.message);
  }
};

//
const updateProperty = async (userId, propertyId, updateData) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error("Property not found");
    }

    // Check if the user is the owner of the property
    if (property.userId !== userId) {
      throw new Error("You are not authorized to update this property");
    }

    // If property exists and user is authorized, proceed with the update
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: updateData,
    });

    return updatedProperty;
  } catch (error) {
    throw new Error("Could not update property: " + error.message);
  }
};

const deleteProperty = async (propertyId) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error(`property with id ${propertyId} not found.`);
    }

    // Delete the property from the database
    await prisma.property.delete({
      where: { id: propertyId },
    });

    return {
      message: `property with id ${propertyId} has been successfully deleted.`,
    };
  } catch (error) {
    throw new Error("Could not delete property.");
  }
};

const getPropertyById = async (propertyId) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new Error(`Property with id ${propertyId} not found.`);
    }
    //  console.log(" id property:", property);
    return property;
  } catch (error) {
    throw new Error(error.message);
  }
};
//
const getAllProperties = async (reqQuery) => {
  const {
    minPrice,
    maxPrice,
    search,
    bedrooms,
    bathrooms,
    type,
    property_type,
    utilities,
    furnishing,
  } = reqQuery;

  try {
    const properties = await prisma.property.findMany();
    return properties;
  } catch (error) {
    throw new Error(error.message);
  }
};

//check if prop is saved before
const saveProperty = async (userId, propertyId) => {
  /// it deletes it when you click twice but for some reason still shows as saved on message
  try {
    if (!userId || !propertyId) {
      throw new Error("User ID and Property ID are required");
    }

    // Check if the user has already saved this property
    const existingSavedProperty = await prisma.savedProperty.findUnique({
      where: {
        userId: userId,
        propertyId: propertyId,
      },
    });

    if (existingSavedProperty) {
      // If the property is already saved, delete it (unsave)
      await prisma.savedProperty.delete({
        where: {
          id: existingSavedProperty.id,
        },
      });

      return { message: "Saved Property removed successfully" };
    } else {
      // If the property is not saved, create a new saved property record
      const savedproperty = await prisma.savedProperty.create({
        data: {
          userId,
          propertyId,
        },
      });
      return { message: "Property saved successfully", savedproperty };
    }
  } catch (error) {
    throw new Error("Could not save property: " + error.message); // Pass error message
  }
};

export default {
  createProperty,
  deleteProperty,
  updateProperty,
  getAllProperties,
  getPropertyById,
  saveProperty,
};
