import { api } from "@/config/apiConfig";
import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROPERTIES_FAILURE,
  GET_USER_PROPERTIES_SUCCESS,
  GET_USER_SAVED_PROPERTIES_FAILURE,
  GET_USER_SAVED_PROPERTIES_REQUEST,
  GET_USER_SAVED_PROPERTIES_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./actionType";

{
  /*export const getUserProfile = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    console.log("ddr", jwt);
    const response = await api.get(`/api/user/profile`);
    const user = response.data;
    console.log("ddr", user);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: user });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};*/
}

export const updateUserProfile = (userDetails) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

  try {
    const response = await api.put(`/api/user/profile`, userDetails);

    const user = response.data;
    console.log("upated user");
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const deleteUser = () => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  try {
    const response = await api.delete(`/api/user/profile`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: response.data.message });

    localStorage.clear();
    return true;
    // Optionally, you might want to handle user removal from the local state or navigate somewhere
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};

export const getUserProperties = () => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });

  try {
    const response = await api.get(`/api/user/profile/property`);
    const property = response.data;
    console.log("user prop", property);
    dispatch({
      type: GET_USER_PROPERTIES_SUCCESS,
      payload: property,
    });

    // Optionally, you might want to handle user removal from the local state or navigate somewhere
  } catch (error) {
    dispatch({ type: GET_USER_PROPERTIES_FAILURE, payload: error.message });
  }
};

export const getUserSavedProperties = () => async (dispatch) => {
  dispatch({ type: GET_USER_SAVED_PROPERTIES_REQUEST });

  try {
    const response = await api.get(`/api/user/profile/saved`);
    const savedProperty = response.data;
    dispatch({
      type: GET_USER_SAVED_PROPERTIES_SUCCESS,
      payload: savedProperty,
    });

    // Optionally, you might want to handle user removal from the local state or navigate somewhere
  } catch (error) {
    dispatch({
      type: GET_USER_SAVED_PROPERTIES_FAILURE,
      payload: error.message,
    });
  }
};
