import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComboBox } from "./ComboBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { vi } from "vitest";

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

describe("ComboBox", () => {
  test("renders label", () => {
    render(<ComboBox label="Choose" />);
    expect(screen.getByText("Choose")).toBeInTheDocument();
  });

  test("renders select with options", () => {
    render(
      <ComboBox>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </ComboBox>,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("handles onChange", () => {
    const handleChange = jest.fn();
    render(
      <ComboBox onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
      </ComboBox>,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
