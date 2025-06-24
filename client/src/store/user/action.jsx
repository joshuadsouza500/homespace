import { api } from "@/config/apiConfig";
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_CHAT_BY_ID_FAILURE,
  GET_CHAT_BY_ID_REQUEST,
  GET_CHAT_BY_ID_SUCCESS,
  GET_USER_CHATS_FAILURE,
  GET_USER_CHATS_REQUEST,
  GET_USER_CHATS_SUCCESS,
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
  
    const response = await api.get(`/api/user/profile`);
    const user = response.data;
  
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: user });
  } catch (error) {

    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};*/
}

export const updateUserProfile = (userDetails) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

  try {
    const response = await api.put(`/api/user/profile`, userDetails);

    const user = response.data;

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

export const getUserChats = () => async (dispatch) => {
  dispatch({ type: GET_USER_CHATS_REQUEST });

  try {
    const response = await api.get(`/api/user/profile/chat`);
    const chats = response.data;

    dispatch({
      type: GET_USER_CHATS_SUCCESS,
      payload: chats,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_CHATS_FAILURE,
      payload: error.message,
    });
  }
};

/* //get users chats */
export const getChatById = (chatId, otherParticipant) => async (dispatch) => {
  dispatch({ type: GET_CHAT_BY_ID_REQUEST });

  try {
    const response = await api.get(`/api/user/profile/chat/${chatId}`, {
      otherParticipant,
    });
    const { chat } = response.data;
    //console.log("Action  chat:", chat);
    dispatch({
      type: GET_CHAT_BY_ID_SUCCESS,
      payload: { chat }, // Send both chat and status
    });
  } catch (error) {
    dispatch({
      type: GET_CHAT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
//get specific chat
export const createChat = (otherParticipant) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });

  try {
    const response = await api.post(
      "/api/user/profile/chat",
      { otherParticipant } // Avoid sending undefined
    );
    const { chat } = response.data;
    // console.log("chat", chat);
    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: chat,
    });
    return { chat }; //return the chat so that we can navigate to the chat view from the property details page
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAILURE,
      payload: error.message,
    });
  }
};
