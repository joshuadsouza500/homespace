import { api } from "@/config/apiConfig";
import {
  CREATE_PROPERTY_FAILURE,
  CREATE_PROPERTY_REQUEST,
  CREATE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
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

    dispatch({ CREATE_PROPERTY_SUCCESS, payload: property });
  } catch (error) {
    dispatch({ CREATE_PROPERTY_FAILURE, payload: error.message });
  }
};

export const updateProperty =
  (propertyDetails, propertyId) => async (dispatch) => {
    dispatch({ UPDATE_PROPERTY_REQUEST });

    try {
      const response = await api.put(
        `/api/property/${propertyId}`,
        propertyDetails
      );
      const updatedProperty = response.data;

      dispatch({ UPDATE_PROPERTY_SUCCESS, payload: updatedProperty });
    } catch (error) {
      dispatch({ UPDATE_PROPERTY_FAILURE, payload: error.message });
    }
  };

export const deleteProperty = (propertyId) => async (dispatch) => {
  dispatch({ DELETE_PROPERTY_REQUEST });

  try {
    const response = await api.delete(`/api/property/${propertyId}`);
    const deletedProperty = response.data;

    dispatch({ DELETE_PROPERTY_SUCCESS, payload: deletedProperty });
  } catch (error) {
    dispatch({ DELETE_PROPERTY_FAILURE, payload: error.message });
  }
};

export const saveProperty = () => async (dispatch) => {
  dispatch({ SAVE_PROPERTY_REQUEST });

  try {
    const response = await api.post(`/api/property/saved`);
    const savedProperty = response.data;

    dispatch({ SAVE_PROPERTY_SUCCESS, payload: savedProperty });
  } catch (error) {
    dispatch({ SAVE_PROPERTY_FAILURE, payload: error.message });
  }
};

export const getPropertyById = (propertyId) => async (dispatch) => {
  dispatch({ GET_PROPERTY_BY_ID_REQUEST });

  try {
    const response = await api.get(`/api/property/${propertyId}`);
    const property = response.data;

    dispatch({ GET_PROPERTY_BY_ID_SUCCESS, payload: property });
  } catch (error) {
    dispatch({ GET_PROPERTY_BY_ID_FAILURE, payload: error.message });
  }
};
