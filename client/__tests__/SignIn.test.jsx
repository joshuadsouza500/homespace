import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { beforeEach, describe, expect, test } from "vitest";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";
import * as authActions from "@/store/auth/action"; //Can access any of the auth actions
import SignIn from "@/pages/SignIn";

// Mock reducer for auth
const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "SIGNIN_ERROR":
      return {
        ...state,
        error: {
          status: 401,
          data: { error: action.payload.error },
        },
      };
    case "SIGNIN_SUCCESS":
      return { ...state, jwt: action.payload };
    case "GET_USER_PROFILE_SUCCESS":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Combine reducers (if you have multiple reducers)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create a real Redux store
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  //Imports the actual react-router-dom module and ovverides the Navigate function
  const actual = await importOriginal("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate, // Mock `useNavigate` to return the mock navigate function
  };
});
//vi.spyOn creates a mock of a function, allowing you to track calls made to the original function and return custom values
//spyO(obj and method to mock0
//mockImplementation allows you to override a the mocked func with a custom implementation
vi.spyOn(authActions, "signin").mockImplementation((userData) => {
  return (dispatch) => {
    localStorage.setItem("jwt", "mockedJwt");
    dispatch({ type: "SIGNIN_SUCCESS", payload: "mockedJwt" });
  };
});

vi.spyOn(authActions, "getUserProfile").mockImplementation((jwt) => {
  return (dispatch) => {
    dispatch({
      type: "GET_USER_PROFILE_SUCCESS",
      payload: { id: 1, name: "John Doe" },
    });
  };
});

describe("SignIn Component", () => {
  //Setup the comp before each test
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
  });

  test("renders the Sign In page", () => {
    // Assertions
    expect(screen.getByTestId("SignIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("Displays error message when input fields are empty", () => {
    //Suimulate form submission

    const buttonClick = screen.getByRole("button", { name: /sign in/i }); //i makes it case insensitiv
    fireEvent.click(buttonClick);
    //Assertions
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid password")).toBeInTheDocument();
  });

  //Email doesnt exist

  test("Displays error message when email doesnt exist", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    const buttonClick = screen.getByRole("button", { name: /sign in/i }); //i makes it case insensitiv
    act(() => {
      //taget is the input field here
      fireEvent.change(emailInput, {
        target: { value: "EmailDoesntExist@email.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(buttonClick);
      store.dispatch({
        type: "SIGNIN_ERROR",
        payload: {
          error: "User does not exist with this email",
        },
      });
    });

    //Assertions
    expect(
      screen.getByText("User does not exist with this email!")
    ).toBeInTheDocument();
  });
  //Password is incorrect
  test("Displays error message when password is incorrect", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    const buttonClick = screen.getByRole("button", { name: /sign in/i }); //i makes it case insensitiv
    act(() => {
      //taget is the input field here
      fireEvent.change(emailInput, {
        target: { value: "email@email.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(buttonClick);
      store.dispatch({
        type: "SIGNIN_ERROR",
        payload: {
          error: "Invalid password",
        },
      });
    });

    //Assertions
    expect(screen.getByText("Invalid password!")).toBeInTheDocument();
  });
  //submitted succesfully and page is navigated

  test("SignIn Success", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const buttonClick = screen.getByRole("button", { name: /sign in/i }); //i makes it case insensitive

    act(() => {
      //simulates user event
      fireEvent.change(emailInput, {
        target: { value: "email@email.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(buttonClick);
    });

    //Assertions
    expect(localStorage.getItem("jwt")).toBe("mockedJwt");
    expect(store.getState().auth.user).toEqual({ id: 1, name: "John Doe" }); // User profile is retrieved
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
