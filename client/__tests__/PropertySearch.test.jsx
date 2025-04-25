import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { thunk } from "redux-thunk";
import { propertyReducer } from "@/store/property/reducer";
import Search from "@/components/pages/Search";
import PropertyCard2 from "@/components/ui/vo/property-card2";

//PROPERTY SEARCH PAGE
//Clicking find works
//Checka if the property card goes to selected property
//pagination works
const initialState = {
  property: {
    filters: { pg: 1 }, // Current page
    properties: {
      properties: [
        { id: 1, name: "Property 1", onClick: vi.fn() },
        { id: 2, name: "Property 2", onClick: vi.fn() },
        { id: 3, name: "Property 3", onClick: vi.fn() },
      ],
      totalPages: 5, // Total number of pages
    },
    isLoading: false, // Ensure loading is false so the component renders
  },
};
vi.mock("@/components/ui/vo/property-card2", () => ({
  __esModule: true,
  default: vi.fn(({ property }) => (
    <div data-testid="property-card" onClick={() => property.onClick()}>
      {property.name}
    </div>
  )),
}));

const rootReducer = combineReducers({ property: propertyReducer });

const store = legacy_createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);
const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});
describe("property search section", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
  });
  test("renders PropertySearch component", () => {
    // screen.debug(); // Inspect the rendered DOM
    expect(
      screen.getByText("Properties for sale in Bahrain")
    ).toBeInTheDocument();

    expect(screen.getByTestId("find-properties-button")).toBeInTheDocument();
  });
  test("renders PropertyCard2 components", async () => {
    screen.debug(); // Check if the correct number of property cards are rendered
    const propertyCards = await screen.findAllByTestId("property-card");
    expect(propertyCards).toHaveLength(3); // Matches the mock data
  });

  /* test("navigates to /property/id on PropertyCard2 click", async () => {
    // Wait for the property cards to appear
    const propertyCards = await screen.findAllByTestId("property-card");

    // Log the property cards for debugging
    // console.log(propertyCards);

    // Simulate clicking the second property card
    const propertyCard = propertyCards[1];
    expect(propertyCard).toBeInTheDocument(); // Ensure the element exists
    fireEvent.click(propertyCard);

    // Check if the navigate function was called with the correct path
    expect(navigate).toHaveBeenCalledWith(
      expect.stringContaining("/property/")
    );
  }); */
});
