import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sheet } from "./Sheet";

// Mock matchMedia at top level to ensure availability
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

console.log("matchMedia type:", typeof window.matchMedia);
console.log("matchMedia check:", window.matchMedia("(min-width: 768px)"));

describe("Sheet", () => {
  test("renders children when open", () => {
    render(
      <Sheet isOpen={true}>
        <div>Sheet Content</div>
      </Sheet>,
    );
    expect(screen.getByText("Sheet Content")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    render(
      <Sheet isOpen={false}>
        <div>Sheet Content</div>
      </Sheet>,
    );
    expect(screen.queryByText("Sheet Content")).not.toBeInTheDocument();
  });

  test("calls onClose when backdrop clicked", () => {
    const handleClose = jest.fn();
    render(
      <Sheet isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Sheet>,
    );

    fireEvent.click(screen.getByTestId("sheet-backdrop"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
