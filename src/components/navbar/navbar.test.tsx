import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./navbar";

describe("Navbar Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the logo", () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    expect(screen.getByTestId("company-logo")).toBeInTheDocument();
  });

  test("shows 'Login' when user is not logged in", () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("shows 'Upload files' button when user is logged in", () => {
    localStorage.setItem("token", "testToken");
    render(<Navbar />, { wrapper: MemoryRouter });

    expect(screen.getByText(/upload files/i)).toBeInTheDocument();
  });

  test("opens the user menu on clicking the profile icon", async () => {
    localStorage.setItem("token", "testToken");
    render(<Navbar />, { wrapper: MemoryRouter });

    const profileButtons = screen.getAllByRole("button");
    fireEvent.click(profileButtons[profileButtons.length - 1]);

    await waitFor(() => {
      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });
  });

  test("logs out the user on clicking logout", async () => {
    localStorage.setItem("token", "testToken");
    localStorage.setItem("file", "testFile");

    render(<Navbar />, { wrapper: MemoryRouter });

    const profileButtons = screen.getAllByRole("button");
    fireEvent.click(profileButtons[profileButtons.length - 1]);
    
    const logoutButton = await screen.findByText(/logout/i);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("file")).toBeNull();
    });
  });
});
