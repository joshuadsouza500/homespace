import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore, combineReducers } from "redux";
import { expect, test } from "vitest";
import SignIn from "@/components/pages/SignIn";

// Mock reducer for auth
const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Combine reducers (if you have multiple reducers)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create a real Redux store
const store = legacy_createStore(rootReducer);

test("renders the Sign In page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );

  // Assertions
  expect(screen.getByText("Sign In")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});
