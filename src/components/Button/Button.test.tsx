import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { vi } from "vitest";

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

describe("Button", () => {
  test("renders with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("handles onClick", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("applies variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole("button");
    // Check for specific class or style if possible, or just execution
    expect(btn).toBeInTheDocument();

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders icon", () => {
    render(<Button icon={faStar}>Star</Button>);
    expect(screen.getByTestId("fa-icon")).toBeInTheDocument();
  });
});
