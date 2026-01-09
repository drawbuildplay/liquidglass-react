import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { vi } from "vitest";

// Mock dependencies
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));
vi.mock("../Input/Input", () => ({
  Input: ({ onChange, onKeyDown, value, placeholder }: any) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  ),
}));
vi.mock("../Button/Button", () => ({
  Button: ({ onClick, variant, icon }: any) => (
    <button onClick={onClick} data-testid={`button-${variant}`}>
      {icon ? "IconBtn" : "Btn"}
    </button>
  ),
}));

describe("Search", () => {
  test("renders input with placeholder", () => {
    render(<Search placeholder="Find..." />);
    expect(screen.getByTestId("search-input")).toHaveAttribute(
      "placeholder",
      "Find...",
    );
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<Search onChange={handleChange} />);
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "test" },
    });
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  test("calls onSearch when Enter pressed", () => {
    const handleSearch = jest.fn();
    render(<Search onSearch={handleSearch} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleSearch).toHaveBeenCalledWith("query");
  });

  test("calls onSearch when button clicked", () => {
    const handleSearch = jest.fn();
    render(<Search onSearch={handleSearch} showSearchButton={true} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "query" } });

    // Search button triggers handleSearchClick
    fireEvent.click(screen.getByTestId("button-secondary"));
    expect(handleSearch).toHaveBeenCalledWith("query");
  });
});
