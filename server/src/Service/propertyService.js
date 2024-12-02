import prisma from "../lib/Prisma.js";

const createProperty = async (userId, reqData) => {
  const {
    title,
    description,
    address,
    city,
    image,
    type,
    property_type,
    utilities,
    furnishing,
    amenities,
    price,
    governate,
    bedrooms,
    bathrooms,
    area,
  } = reqData;

  try {
    //console.log("prop reqdata", reqData);
    const imagesArray = Array.isArray(image) ? image : [image]; // Convert to array
    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        address,
        city,
        governate,
        image: imagesArray, //useimageArray here after you configue cloudinary
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        area: parseFloat(area),
        type,
        property_type,
        utilities,
        furnishing,
        amenities,
        userId,
      },
    });
    console.log("prop ", newProperty);
    return newProperty;
  } catch (error) {
    throw new Error("Could not create property: " + error.message);
  }
};

const updateProperty = async (userId, propertyId, updateData) => {
  try {
    // Find the property by ID
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error("Property not found");
    }

    // Check if the user is the owner of the property
    if (property.userId !== userId) {
      throw new Error(
        "Unauthorized: You are not allowed to update this property"
      );
    }

    const {
      description,
      amenities,
      area,
      bathrooms,
      bedrooms,
      furnishing,
      image,
      price,
      title,
      type,
      utilities,
      //  city,
      // address,
      //  governate,
    } = updateData;

    // Proceed with the update
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        description,
        amenities,
        area,
        bathrooms,
        bedrooms,
        furnishing,
        image,
        price,
        title,
        type,
        utilities,
        //  city,
        // address,
        // governate,
      },
    });

    //  console.log("Updated Property:", updatedProperty);
    return updatedProperty;
  } catch (error) {
    console.error("Error updating property:", error);
    throw new Error("Could not update property: " + error.message);
  }
};

const deleteProperty = async (propertyId) => {
  console.log(propertyId);
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
    throw new Error("Could not delete property." + error.message);
  }
};

const getPropertyById = async (propertyId, userId) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { user: true },
    });
    if (!property) {
      throw new Error(`Property with id ${propertyId} not found.`);
    }

    let savedProperty = null;
    if (userId) {
      savedProperty = await prisma.savedProperty.findUnique({
        where: {
          userId_propertyId: {
            userId,
            propertyId,
          },
        },
      });
    }

    return { ...property, isSaved: savedProperty ? true : false };
  } catch (error) {
    throw new Error(error.message);
  }
};
//
/**
 * const getAllProperties = async (reqQuery) => {
  const { mnP, mxP, beds, baths, type, pty, ut, frn, search } = reqQuery;

  const minPrice = mnP;
  const maxPrice = mxP;

  const bedrooms = beds;
  const bathrooms = baths;

  const property_type = pty;
  const utilities = ut;
  const furnishing = frn;
  console.log(reqQuery);
  try {
    const filters = [
      //minPrice && is used to make sure that there is a value
      minPrice && { price: { gte: parseFloat(minPrice) } },
      maxPrice && { price: { lte: parseFloat(maxPrice) } },
      bedrooms && { bedrooms: parseInt(bedrooms) },
      bathrooms && { bathrooms: parseInt(bathrooms) },
      type && { type },
      property_type && { property_type },
      utilities && { utilities },
      furnishing && { furnishing },
      search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    ].filter(Boolean);

    /*Boolean is a built-in function that converts any value to true or false. For example:
    Boolean(undefined) -> false
    Boolean(null) -> false
    Boolean(0) -> false, Boolean("") -> false,    Boolean("some value") -> true
    Boolean({}) -> true
    */

//Prisma throws errors if a value is undefined
/*   const properties = await prisma.property.findMany({
      where: {
        //ANd mean all of these conditions must be met
        AND: filters,
      },
      include: {
        user: true, // Include related user details
      },
    });
    console.log(properties);
    
    return properties;
  } catch (error) {
    throw new Error(error.message);
  }
};
 */

//add search using givernate here
const getAllProperties = async (reqQuery, userId) => {
  const { mnP, mxP, beds, baths, type, pty, ut, frn, search, city, srt, gov } =
    reqQuery;
  let SORT = "";
  const minPrice = mnP;
  const maxPrice = mxP;
  const bedrooms = beds;
  const bathrooms = baths;
  const property_type = pty;
  const utilities = ut;
  const furnishing = frn;
  const governate = gov;

  console.log("reqQuery.city", city);
  try {
    const filters = [
      //minPrice && is used to make sure that there is a value
      minPrice && { price: { gte: parseFloat(minPrice) } },
      maxPrice && { price: { lte: parseFloat(maxPrice) } },
      bedrooms && { bedrooms: parseInt(bedrooms) },
      bathrooms && { bathrooms: parseInt(bathrooms) },
      type && { type },
      property_type && { property_type },
      utilities && { utilities },
      furnishing && { furnishing },
      governate && { governate },
      city && { city },
      search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    ].filter(Boolean);

    /*Boolean is a built-in function that converts any value to true or false. For example:
    Boolean(undefined) -> false
    Boolean(null) -> false
    Boolean(0) -> false, Boolean("") -> false,    Boolean("some value") -> true
    Boolean({}) -> true
    */

    //Prisma throws errors if a value is undefined
    if (srt) {
      if (srt === "low") {
        SORT = { price: "asc" };
      } else if (srt === "high") {
        SORT = { price: "desc" };
      } else if (srt === "new") {
        SORT = { createdAt: "desc" }; // Sort by createdAt in descending order
      }
    }

    const properties = await prisma.property.findMany({
      where: {
        //ANd mean all of these conditions must be met
        AND: filters,
      },
      include: {
        user: true, // Include related user details
      },
      orderBy: SORT || undefined,
    });
    let savedIds = new Set();

    if (userId) {
      const savedProperties = await prisma.savedProperty.findMany({
        where: { userId },
        select: { propertyId: true },
      });

      // Populate the Set with saved property IDs
      savedIds = new Set(savedProperties.map((p) => p.propertyId));
    }

    // 4. Add the `isSaved` field to each property based on whether it exists in the savedIds Set.
    return properties.map((property) => ({
      ...property, // Copy all property details
      isSaved: savedIds.has(property.id), // Check if property ID is in the Set
    }));
  } catch (error) {
    console.error("Error in getAllProperties:", error.message);
    throw new Error(error.message);
  }
};

//check if prop is saved before
const saveProperty = async (userId, propertyId) => {
  try {
    if (!userId || !propertyId) {
      throw new Error("User ID and Property ID are required");
    }
    // Check if the user has already saved this property
    const existingSavedProperty = await prisma.savedProperty.findUnique({
      where: {
        //prisma makes a composite obj anf that is the composite key
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });
    if (existingSavedProperty) {
      // If the property is already saved, delete it
      console.log("Property found, removing...");
      await prisma.savedProperty.delete({
        where: {
          userId_propertyId: { userId, propertyId },
        },
      });
      console.log("Property removed successfully.");
      return { message: "Saved Property removed successfully" };
    } else {
      const savedProperty = await prisma.savedProperty.create({
        data: {
          userId,
          propertyId,
        },
        include: {
          property: true, //include the related property details
        },
      });
      console.log("Property saved successfully.", savedProperty);
      return { message: "Property saved successfully", savedProperty };
    }
  } catch (error) {
    console.error("Error in saveProperty:", error.message);
    throw new Error("Could not save property: " + error.message);
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
