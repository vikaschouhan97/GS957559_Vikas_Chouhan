import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("xlsx", () => ({
  read: jest.fn(),
}));

// Mock FileReader
class MockFileReader {
  result: any;
  onload: () => void = () => null;

  readAsBinaryString() {
    this.onload();
  }
  readAsDataURL() {
    this.onload();
  }
}

(global as any).FileReader = MockFileReader;

describe("Navbar Component", () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    Storage.prototype.removeItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("1. Renders company logo", () => {
    render(<Navbar />);
    expect(screen.getByTestId("company-logo")).toBeInTheDocument();
  });

  test("2. Shows login text when not authenticated", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    render(<Navbar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("3. Displays upload button and user avatar when authenticated", () => {
    (localStorage.getItem as jest.Mock).mockImplementation((key) =>
      key === "token" ? "mock-token" : null
    );
    render(<Navbar />);
    expect(screen.getByText("Upload files")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open settings/i })).toBeInTheDocument();
  });

  test("4. Opens user menu and handles logout", async () => {
    (localStorage.getItem as jest.Mock).mockImplementation((key) =>
      key === "token" ? "mock-token" : null
    );
    render(<Navbar />);
    
    fireEvent.click(screen.getByRole("button", { name: /open settings/i }));
    await waitFor(() => expect(screen.getByText("Logout")).toBeInTheDocument());
    
    fireEvent.click(screen.getByText("Logout"));
    
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("file");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("5. Navigates to login page after logout", async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue("mock-token");
    render(<Navbar />);
    
    fireEvent.click(screen.getByRole("button", { name: /open settings/i }));
    fireEvent.click(await screen.findByText("Logout"));
    
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
