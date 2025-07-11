import { api } from "@/config/apiConfig";
import {
  CREATE_PROPERTY_FAILURE,
  CREATE_PROPERTY_REQUEST,
  CREATE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  GET_ALL_PROPERTY_FAILURE,
  GET_ALL_PROPERTY_REQUEST,
  GET_ALL_PROPERTY_SUCCESS,
  GET_PROPERTY_BY_ID_FAILURE,
  GET_PROPERTY_BY_ID_REQUEST,
  GET_PROPERTY_BY_ID_SUCCESS,
  SAVE_PROPERTY_FAILURE,
  SAVE_PROPERTY_REQUEST,
  SAVE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAILURE,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
} from "./actionType";

export const createProperty = (propertyDetails) => async (dispatch) => {
  dispatch({ type: CREATE_PROPERTY_REQUEST });

  try {
    const response = await api.post(`/api/property`, propertyDetails);
    const property = response.data;
    //console.log("action property", property);
    dispatch({ type: CREATE_PROPERTY_SUCCESS, payload: property });
    return { success: true, property };
    // alert("Property created successfully");
  } catch (error) {
    dispatch({ type: CREATE_PROPERTY_FAILURE, payload: error.message });
    return { success: false, message: error.message };
  }
};

export const updateProperty =
  (propertyDetails, propertyId) => async (dispatch) => {
    dispatch({ type: UPDATE_PROPERTY_REQUEST });

    try {
      const response = await api.put(
        `/api/property/${propertyId}`,
        propertyDetails
      );
      const updatedProperty = response.data;

      dispatch({ type: UPDATE_PROPERTY_SUCCESS, payload: updatedProperty });
      return { success: true };
    } catch (error) {
      dispatch({ type: UPDATE_PROPERTY_FAILURE, payload: error.message });
      return { success: false, message: error.message };
    }
  };

export const deleteProperty = (propertyId) => async (dispatch) => {
  dispatch({ type: DELETE_PROPERTY_REQUEST });

  try {
    const response = await api.delete(`/api/property/${propertyId}`);
    const deletedProperty = response.data;

    dispatch({ type: DELETE_PROPERTY_SUCCESS, payload: deletedProperty });
    return true;
  } catch (error) {
    dispatch({ type: DELETE_PROPERTY_FAILURE, payload: error.message });
  }
};

export const saveProperty = (propertyId) => async (dispatch) => {
  dispatch({ type: SAVE_PROPERTY_REQUEST });

  try {
    const response = await api.post(`/api/property/saved`, { propertyId });
    const savedProperty = response.data;

    // console.log("action", savedProperty);
    // if text says saved then
    dispatch({ type: SAVE_PROPERTY_SUCCESS, payload: savedProperty });
  } catch (error) {
    dispatch({ type: SAVE_PROPERTY_FAILURE, payload: error.message });
  }
};

export const getPropertyById = (propertyId) => async (dispatch) => {
  dispatch({ type: GET_PROPERTY_BY_ID_REQUEST });

  try {
    const response = await api.get(`/api/property/${propertyId}`);
    const property = response.data;

    dispatch({ type: GET_PROPERTY_BY_ID_SUCCESS, payload: property });
  } catch (error) {
    dispatch({ type: GET_PROPERTY_BY_ID_FAILURE, payload: error.message });
  }
};

export const getAllProperties = (reqQuery) => async (dispatch) => {
  dispatch({ type: GET_ALL_PROPERTY_REQUEST });
  {
    /** const {
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
  const params = URLSearchParams **/
  }

  try {
    const response = await api.get(`/api/property?${reqQuery}`);
    const properties = response.data;
    //  console.log("Get all Action props", properties);
    dispatch({ type: GET_ALL_PROPERTY_SUCCESS, payload: properties });
  } catch (error) {
    dispatch({ type: GET_ALL_PROPERTY_FAILURE, payload: error.message });
  }
};
