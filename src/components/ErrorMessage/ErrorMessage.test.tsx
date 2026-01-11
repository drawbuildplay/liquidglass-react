import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";
import { vi } from "vitest";

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

describe("ErrorMessage", () => {
  test("renders message", () => {
    render(<ErrorMessage message="Something wrong" />);
    expect(screen.getByText("Something wrong")).toBeInTheDocument();
  });

  test("renders close button and handles click", () => {
    const onClose = vi.fn();
    render(<ErrorMessage message="Error" onClose={onClose} />);

    const closeBtn = screen.getByRole("button");
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test("does not render close button if onClose not provided", () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
