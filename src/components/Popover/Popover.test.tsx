import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";

import { vi } from "vitest";

// Mock Overlay to just render children and a close handler overlay
vi.mock("../Overlay/Overlay", () => ({
  Overlay: ({ isOpen, onClose, children }: any) =>
    isOpen ? (
      <div data-testid="overlay">
        <div data-testid="backdrop" onClick={onClose} />
        {children}
      </div>
    ) : null,
}));

describe("Popover", () => {
  test("renders nothing when closed", () => {
    render(
      <Popover isOpen={false} onClose={jest.fn()}>
        <div>Content</div>
      </Popover>,
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });

  test("renders content when open", () => {
    render(
      <Popover isOpen={true} onClose={jest.fn()}>
        <div>Popover Content</div>
      </Popover>,
    );
    expect(screen.getByText("Popover Content")).toBeInTheDocument();
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
  });

  test("renders title if provided", () => {
    render(
      <Popover isOpen={true} onClose={jest.fn()} title="My Title">
        <div>Content</div>
      </Popover>,
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  test("calls onClose when clicking content (per implementation)", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Popover isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Popover>,
    );

    // The Popover component has onClick={onClose} on the container itself!
    // This is unusual ("clicking the popover... will close the popover").
    const container = screen.getByText("Content").closest("div")?.parentElement; // div wrapping content children
    // Actually children wrapper is inside container.
    // container <- title & children wrapper.
    // Let's find by text and traverse up.
    // Structure: div (container, onClick) -> h3 (title), div (children wrapper) -> children.

    // So clicking content wrapper bubbles to container -> onClose.
    await user.click(screen.getByText("Content"));
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when clicking backdrop (Overlay)", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Popover isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Popover>,
    );

    await user.click(screen.getByTestId("backdrop"));
    expect(onClose).toHaveBeenCalled();
  });

  test("applies custom className", () => {
    render(
      <Popover isOpen={true} onClose={jest.fn()} className="custom-class">
        <div>Content</div>
      </Popover>,
    );
    // Content -> Wrapper -> Container
    const contentDiv = screen.getByText("Content");
    const wrapper = contentDiv.parentElement;
    const container = wrapper?.parentElement;

    expect(container).toHaveClass("custom-class");
  });
});
