import React from "react";
import { render, screen } from "@testing-library/react";
import { Grid } from "./Grid";

describe("Grid", () => {
  test("renders children", () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("applies container classes", () => {
    render(
      <Grid data-testid="grid">
        <div />
      </Grid>,
    );
    const container = screen.getByTestId("grid");
    expect(container).toHaveClass("liquid-glass-grid-container");
    // Inner div check
    const inner = container.firstChild;
    expect(inner).toHaveClass("liquid-glass-grid-content");
  });

  test("passes other props to container", () => {
    render(
      <Grid aria-label="My Grid">
        <div />
      </Grid>,
    );
    // Grid spreads props to outer div
    const container = screen.getByLabelText("My Grid");
    expect(container).toBeInTheDocument();
  });
});
