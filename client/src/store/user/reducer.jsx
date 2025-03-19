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
  GET_USER_PROPERTIES_FAILURE,
  GET_USER_PROPERTIES_REQUEST,
  GET_USER_PROPERTIES_SUCCESS,
  GET_USER_SAVED_PROPERTIES_FAILURE,
  GET_USER_SAVED_PROPERTIES_REQUEST,
  GET_USER_SAVED_PROPERTIES_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./actionType";

const initialState = {
  user: null,
  property: null,
  savedProperty: null,
  userChats: [],
  selectedChat: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
    case GET_USER_PROPERTIES_REQUEST:
    case GET_USER_SAVED_PROPERTIES_REQUEST:
    case DELETE_USER_REQUEST:
    case GET_USER_CHATS_REQUEST:
    case GET_CHAT_BY_ID_REQUEST:
    case CREATE_CHAT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case GET_USER_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        property: action.payload,
      };
    case GET_USER_SAVED_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        savedProperty: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null, // Optionally set user to null if you want to clear it
      };

    case GET_USER_CHATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userChats: action.payload, // Store all chats
      };

    case GET_CHAT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedChat: action.payload, // Store all chats
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userChats: [...state.userChats, action.payload], // Add new chat to userChats
        selectedChat: action.payload, // Store all chats
      };

    case UPDATE_USER_PROFILE_FAILURE:
    case GET_USER_PROPERTIES_FAILURE:
    case GET_USER_SAVED_PROPERTIES_FAILURE:
    case DELETE_USER_FAILURE:
    case GET_USER_CHATS_FAILURE:
    case GET_CHAT_BY_ID_FAILURE:
    case CREATE_CHAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
