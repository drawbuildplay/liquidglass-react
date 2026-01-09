import React from "react";
import { render, screen } from "@testing-library/react";
import { GlassPanel } from "./GlassPanel";

describe("GlassPanel", () => {
  test("renders children", () => {
    render(
      <GlassPanel>
        <div>Content</div>
      </GlassPanel>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("applies custom class", () => {
    const { container } = render(
      <GlassPanel className="custom-class">Content</GlassPanel>,
    );
    expect(container.firstChild).toHaveClass("liquid-glass-panel");
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("passes other props", () => {
    render(<GlassPanel data-testid="glass-panel">Content</GlassPanel>);
    expect(screen.getByTestId("glass-panel")).toBeInTheDocument();
  });
});
