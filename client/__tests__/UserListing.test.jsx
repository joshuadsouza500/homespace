import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { describe, test, expect, vi, beforeEach } from "vitest";
import { userReducer } from "@/store/user/reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "@/store/auth/reducer";
import UserListings from "@/components/User/UserProp/UserListings";

const rootReducer = combineReducers({ user: userReducer, auth: authReducer });
const initialState = {
  auth: {
    user: { id: "123", name: "Test User", email: "testuser@example.com" },
    jwt: "mock-jwt-token",
  },
  user: {
    user: { id: "123", name: "Test User", email: "testuser@example.com" },
    property: [
      // flat array of properties
      { id: "1", title: "Property 1" },
      { id: "2", title: "Property 2" },
    ],
    total: 7,
    isLoading: false,
  },
};

const store = legacy_createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock PropertyCard component
vi.mock("@/components/UI/property-card", () => ({
  __esModule: true,
  default: vi.fn(({ property }) => (
    <div
      data-testid="property-card"
      onClick={() => mockedNavigate(`/property/${property.id}`)} // simulate the mock card to have an onClick
    >
      {property.title}
    </div>
  )),
}));

describe("UserListings Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("renders the page title", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserListings />
        </BrowserRouter>
      </Provider>
    );

    // Check if the title is rendered
    expect(screen.getByText("My Properties")).toBeInTheDocument();
  });

  test("renders PropertyCard components", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserListings />
        </BrowserRouter>
      </Provider>
    );

    // Check if PropertyCard components are rendered
    const propertyCards = screen.getAllByTestId("property-card");
    expect(propertyCards).toHaveLength(2); // Matches the mock data
    expect(propertyCards[0]).toHaveTextContent("Property 1");
    expect(propertyCards[1]).toHaveTextContent("Property 2");
  });

  test("navigates to property detail page on click", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserListings />
        </BrowserRouter>
      </Provider>
    );

    const propertyCards = screen.getAllByTestId("property-card");
    fireEvent.click(propertyCards[0]); // Simulate clicking on the first card

    expect(mockedNavigate).toHaveBeenCalledWith("/property/1");
  });
});
