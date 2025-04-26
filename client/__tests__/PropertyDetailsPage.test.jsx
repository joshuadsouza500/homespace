import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PropertyDetails from "@/components/pages/PropertyDetails";
import { saveProperty } from "@/store/property/action";
import { describe, vi } from "vitest";
import { beforeEach } from "vitest";
import { test } from "vitest";
import { expect } from "vitest";
import { authReducer } from "@/store/auth/reducer";
import { propertyReducer } from "@/store/property/reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
});

// Create a real Redux store
const initialState = {
  auth: {
    user: { id: "123", name: "Test User", email: "testuser@example.com" },
    jwt: "mock-jwt-token",
  },
  property: {
    property: {
      id: "1",
      title: "Test Property",
      description: "A beautiful property for testing.",
    },
    properties: [
      {
        properties: [
          // flat array of properties
          { id: "1", title: "Property 1" },
          { id: "2", title: "Property 2" },
          { id: "3", title: "Property 3" },
          { id: "4", title: "Property 4" },
          { id: "5", title: "Property 5" },
          { id: "6", title: "Property 6" },
          { id: "7", title: "Property 7" },
        ],
        total: 7,
      },
    ],
  },
};
const store = legacy_createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

//Immport the action module and mock a particular function
vi.mock("@/store/property/action", () => ({
  saveProperty: vi.fn(),
}));

const mockDispatch = vi.fn();
const navigate = vi.fn();

describe("PropertyDetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the property details page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PropertyDetails />
        </BrowserRouter>
      </Provider>
    );

    // Check if the property details are rendered
    expect(screen.getByText("Test Property")).toBeInTheDocument();
    expect(
      screen.getByText("A beautiful property for testing.")
    ).toBeInTheDocument();
  });

  test("allows saving a property", async () => {
    // Mock useDispatch locally for this test because otherwise it would interfere with the real dispatch needed to get data from store

    vi.mock("react-redux", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useDispatch: () => mockDispatch, // Mock useDispatch locally
      };
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PropertyDetails />
        </BrowserRouter>
      </Provider>
    );

    // Simulate clicking the save button
    const saveButton = screen.getByTestId("save-property-icon");
    fireEvent.click(saveButton);

    // Assert that the dispatch function was called with the saveProperty action
    expect(mockDispatch).toHaveBeenCalledWith(saveProperty("1"));
  });

  /*   test("navigates to chat when messaging the agent", async () => {
    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useNavigate: () => navigate, // Mock `useNavigate` to return the mock navigate function
      };
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PropertyDetails />
        </BrowserRouter>
      </Provider>
    );

    // Simulate clicking the message agent button
    const messageButton = screen.getByTestId("MessageAgent");
    fireEvent.click(messageButton);

    // Assert that navigation to chat occurred
    expect(navigate).toHaveBeenCalledWith(expect.stringContaining("/user/"));
  }); */
});
