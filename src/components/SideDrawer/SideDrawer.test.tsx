import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SideDrawer } from "./SideDrawer";
import { Button } from "../Button/Button";

import { vi } from "vitest";

// Mock dependencies
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));
vi.mock("../GlassPanel/GlassPanel", () => ({
  GlassPanel: ({ children, className }: any) => (
    <div className={className} data-testid="glass-panel">
      {children}
    </div>
  ),
}));
vi.mock("../Button/Button", () => ({
  Button: ({ onClick, className, "aria-label": ariaLabel }: any) => (
    <button onClick={onClick} className={className} aria-label={ariaLabel}>
      Mock Button
    </button>
  ),
}));

describe("SideDrawer", () => {
  test("renders children", () => {
    render(
      <SideDrawer isOpen={true} onToggle={jest.fn()}>
        <div>Drawer Content</div>
      </SideDrawer>,
    );
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  test("toggles open class", () => {
    const { container, rerender } = render(
      <SideDrawer isOpen={true} onToggle={jest.fn()}>
        <div>C</div>
      </SideDrawer>,
    );
    expect(container.querySelector(".side-drawer-container")).toHaveClass(
      "open",
    );

    rerender(
      <SideDrawer isOpen={false} onToggle={jest.fn()}>
        <div>C</div>
      </SideDrawer>,
    );
    expect(container.querySelector(".side-drawer-container")).toHaveClass(
      "collapsed",
    );
  });

  test("calls onToggle when button clicked", () => {
    const handleToggle = jest.fn();
    render(
      <SideDrawer isOpen={true} onToggle={handleToggle}>
        <div>C</div>
      </SideDrawer>,
    );

    fireEvent.click(screen.getByText("Mock Button"));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
