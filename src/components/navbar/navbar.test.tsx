import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Navbar from "./navbar";

const mockStore = configureStore([]);

describe("Navbar Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      auth: { isAuthenticated: false },
    });

    store.dispatch = jest.fn(); // Mock dispatch
  });

  test("renders the logo", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("company-logo")).toBeInTheDocument();
  });

  test("shows 'Login' when user is not logged in", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("shows 'Upload files' button when user is logged in", () => {
    localStorage.setItem("token", "testToken");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/upload files/i)).toBeInTheDocument();
  });

  test("opens the user menu on clicking the profile icon", async () => {
    localStorage.setItem("token", "testToken");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const profileButtons = screen.getAllByRole("button");
    fireEvent.click(profileButtons[profileButtons.length - 1]);

    await waitFor(() => {
      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });
  });

  test("logs out the user on clicking logout", async () => {
    localStorage.setItem("token", "testToken");
    localStorage.setItem("file", "testFile");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const profileButtons = screen.getAllByRole("button");
    fireEvent.click(profileButtons[profileButtons.length - 1]);

    const logoutButton = await screen.findByText(/logout/i);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("file")).toBeNull();
      expect(store.dispatch).toHaveBeenCalledTimes(1); // Ensure Redux dispatch is triggered
    });
  });
});
