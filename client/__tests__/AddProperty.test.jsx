import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import AddProperty2 from "@/components/user/AddProperty2";
import { propertyReducer } from "@/store/property/reducer";

// Mock Redux store
const rootReducer = combineReducers({ property: propertyReducer });
const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));

describe("AddProperty section", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddProperty2 />
        </BrowserRouter>
      </Provider>
    );
  });

  test("renders the AddProperty page", () => {
    // Check if the title is rendered
    expect(screen.getByText("Add New Property")).toBeInTheDocument();
  });

  test("displays error messages when clicking 'Next' without entering values", () => {
    // Find the "Next" button
    const nextButton = screen.getByText("Next");

    // Simulate clicking the "Next" button
    fireEvent.click(nextButton);

    // Check for error messages
    expect(screen.getByText("Image is required")).toBeInTheDocument();
    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("City is required")).toBeInTheDocument();
    expect(screen.getByText("Governorate is required")).toBeInTheDocument();
    expect(screen.getByText("Address is required")).toBeInTheDocument();
  });

  /*   test("Goes to second step when data is filled", () => {
    // Find the "Next" button
    const imageInput = screen.getByTestId("image-preview");
    const titleInput = screen.getByLabelText("Title");
    // const cityInput = screen.getByLabelText("City");
    const govInput = screen.getByLabelText("Governorate");
    const addressInput = screen.getByLabelText("Address");
    const nextButton = screen.getByLabelText("Next");

    fireEvent.change(imageInput, { target: { value: "https://image" } });
    fireEvent.change(titleInput, { target: { value: "Skyrise apartment" } });
    // fireEvent.change(cityInput, { target: { value: "Riffa" } });
    fireEvent.change(govInput, { target: { value: "Southern Governate" } });
    fireEvent.change(addressInput, { target: { value: "block 788 road 33" } });
    // Simulate clicking the "Next" button
    fireEvent.click(nextButton);

    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    // Check for error messages
  }); */
});
