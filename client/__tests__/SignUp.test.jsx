import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { beforeEach, describe, expect, test } from "vitest";
import SignUp from "@/components/pages/SignUp";
import { vi } from "vitest";
import * as authActions from "@/store/auth/action";
//Mock Resize Observer ResizeObserver is a browser API that is not available in the Node.js environment used by testing libraries
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

// Mock reducer for auth
const authReducer = (state = { user: null, error: null }, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return { ...state, user: action.payload };
    case "SIGNUP_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
const rootReducer = combineReducers({ auth: authReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// Mock `signup` action
const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});
vi.spyOn(authActions, "signup").mockImplementation((formData) => {
  return (dispatch) => {
    if (formData.email === "existing@email.com") {
      dispatch({
        type: "SIGNUP_ERROR",
        payload: { status: 409, data: { error: "Email already exists" } },
      });
    } else {
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: { id: 1, name: formData.name },
      });
    }
  };
});

describe("SignUp component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
  });

  test("Displays error messages when next is being clicked without filling the form", () => {
    const nextButtonClick = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButtonClick);
    //Assertions
    expect(screen.getByText("Enter a valid name")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid mobile number")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  //Test to see if nextmoves to next section
  test("Navigates to step 2 when next is clicked and data is filled", () => {
    const nameInput = screen.getByLabelText("Name");
    const mobileInput = screen.getByLabelText("Mobile");
    const emailInput = screen.getByLabelText("Email");
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(mobileInput, { target: { value: "342668712" } });
    fireEvent.change(emailInput, { target: { value: "john@email.com" } });
    fireEvent.click(nextButton);

    expect(
      screen.getByText("Create your account (Step 2 of 2)")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("submits the form successfully", () => {
    const nameInput = screen.getByLabelText("Name");
    const mobileInput = screen.getByLabelText("Mobile");
    const emailInput = screen.getByLabelText("Email");
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(mobileInput, { target: { value: "1234567890" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(nextButton);

    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(store.getState().auth.user).toEqual({ id: 1, name: "John Doe" });
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
