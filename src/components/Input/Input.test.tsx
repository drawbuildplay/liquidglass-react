import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { vi } from "vitest";

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

describe("Input", () => {
  test("renders input element", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  test("handles onChange", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("renders left element", () => {
    render(<Input leftElement={<span data-testid="left-el">L</span>} />);
    expect(screen.getByTestId("left-el")).toBeInTheDocument();
  });

  test("renders right element", () => {
    render(<Input rightElement={<span data-testid="right-el">R</span>} />);
    expect(screen.getByTestId("right-el")).toBeInTheDocument();
  });

  test("renders search variant icon", () => {
    render(<Input variant="search" />);
    expect(screen.getByTestId("fa-icon")).toBeInTheDocument();
  });
});
