import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { propertyReducer } from "./property/reducer";
import { userReducer } from "./user/reducer";

//reducers
const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  property: propertyReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

//apply thunk middleware as usually actions can only be obj but with thunk we can dispatch functions
