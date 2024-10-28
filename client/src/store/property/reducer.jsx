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

const initialState = {
  properties: null,
  property: null,
  savedProperty: null,
  isLoading: false,
  error: null,
};

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROPERTY_REQUEST:
    case DELETE_PROPERTY_REQUEST:
    case UPDATE_PROPERTY_REQUEST:
    case SAVE_PROPERTY_REQUEST:
    case GET_PROPERTY_BY_ID_REQUEST:
    case GET_ALL_PROPERTY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_PROPERTY_SUCCESS:
    case UPDATE_PROPERTY_SUCCESS:
    case DELETE_PROPERTY_SUCCESS:
    case GET_PROPERTY_BY_ID_SUCCESS:
      return {
        ...state,
        property: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_ALL_PROPERTY_SUCCESS:
      return {
        ...state,
        properties: action.payload,
        isLoading: false,
        error: null,
      };
    case SAVE_PROPERTY_SUCCESS: {
      if (action.payload.message.includes("removed")) {
        // If property was removed
        console.log("Remove");
        return {
          ...state,
          savedProperty: state.savedProperty.filter(
            (prop) => prop.propertyId !== action.payload.savedProperty.id
          ),
        };
      } else {
        // If property was saved
        return {
          ...state,
          savedProperty: [...state.savedProperty, action.payload.savedProperty],
        };
      }
    }
    case CREATE_PROPERTY_FAILURE:
    case UPDATE_PROPERTY_FAILURE:
    case SAVE_PROPERTY_FAILURE:
    case DELETE_PROPERTY_FAILURE:
    case GET_PROPERTY_BY_ID_FAILURE:
    case GET_ALL_PROPERTY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
