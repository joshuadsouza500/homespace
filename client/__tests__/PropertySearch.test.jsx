import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { thunk } from "redux-thunk";
import { propertyReducer } from "@/store/property/reducer";
import Search from "@/components/pages/Search";

//PROPERTY SEARCH PAGE
//Clicking find works
//Checka if the property card goes to selected property
//pagination works
const initialState = {
  property: {
    properties: [
      {
        properties: [
          { id: "1", title: "Property 1" },
          { id: "2", title: "Property 2" },
          { id: "3", title: "Property 3" },
          { id: "4", title: "Property 4" },
        ],
        total: 4,
      },
    ],
    isLoading: false,
  },
};
vi.mock("@/components/ui/vo/property-card2", () => ({
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

// Mock BigPropertyCard component
vi.mock("@/components/ui/vo/Big-propery-card", () => ({
  __esModule: true,
  default: vi.fn(({ property }) => (
    <div data-testid="big-property-card">{property?.title}</div>
  )),
}));

const rootReducer = combineReducers({ property: propertyReducer });

const store = legacy_createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal("react-router-dom");
  return {
    ...actual, // Spread the actual module's exports
    useNavigate: () => mockedNavigate,
  };
});
describe("property search section", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
  });
  test("renders PropertySearch component", () => {
    expect(
      screen.getByText("Properties for sale in Bahrain")
    ).toBeInTheDocument();

    expect(screen.getByTestId("find-properties-button")).toBeInTheDocument();
  });
  /*   test("navigates to property/id on PropertyCard2 click", () => {
    // Wait for the property cards to appear
    const propertyCards = screen.getAllByTestId("property-card");
    fireEvent.click(propertyCards[2]);

    expect(mockedNavigate).toHaveBeenCalledWith("/property/2");
  }); */
});
