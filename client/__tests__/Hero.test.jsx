import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { thunk } from "redux-thunk";
import { propertyReducer } from "@/store/property/reducer";
import Hero from "@/components/Homepage/Hero";

//Test to see when clicking find properties it navigates to the properties page and then test to see if clicking the select city selects something

const rootReducer = combineReducers({ property: propertyReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});
describe("Hero section", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Hero />
        </BrowserRouter>
      </Provider>
    );
  });

  //Test to see if hero renders
  test("Hero renders", () => {
    const title = screen.getByText("Home Hunting Simplified");
    expect(title).toBeInTheDocument();
  });
  //Test to see if find properties naviagtes to different page
  test("Find properties button navigates to properties page", () => {
    const findPropetiesButton = screen.getByTestId("find-properties-button");
    fireEvent.click(findPropetiesButton);
    expect(navigate).toHaveBeenCalledWith(expect.stringContaining("/property"));
  });
  //See if clickng slect city selects something
  test("Select city button works", async () => {
    const searchBars = screen.getAllByTestId("search-bar");
    const searchBar = searchBars[0];
    fireEvent.change(searchBar, { target: { value: "Manama" } });
    expect(searchBar.value).toBe("Manama");
  });
  /* test("Select property type  works", async () => {
    const propertyTypeDropdown = screen.getByTestId("property-type");
    console.log(propertyTypeDropdown);
    fireEvent.click(propertyTypeDropdown);
    // Simulate selecting the "Villa" option
    const villaOption = await screen.getByText("Villa");
    fireEvent.click(villaOption);
    const selectedValue = screen.getByTestId("property-type-selected-value");
    expect(selectedValue.textContent).toBe("Villa");
  }); */
});

//Property Details Page
//See if data is rendered
//messsage navigates to chat
