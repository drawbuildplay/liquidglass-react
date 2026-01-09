import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

import { vi } from "vitest";

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

describe("EmptyState", () => {
  test("renders title", () => {
    render(<EmptyState title="No Items" />);
    expect(screen.getByText("No Items")).toBeInTheDocument();
  });

  test("renders description", () => {
    render(<EmptyState title="Title" description="There are no items here." />);
    expect(screen.getByText("There are no items here.")).toBeInTheDocument();
  });

  test("renders icon", () => {
    render(<EmptyState title="Title" icon={faInfo} />);
    expect(screen.getByTestId("fa-icon")).toBeInTheDocument();
  });

  test("renders action", () => {
    render(<EmptyState title="Title" action={<button>Retry</button>} />);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });
});
