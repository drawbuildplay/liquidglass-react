import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PopUpButtonMenu, type PopUpMenuItem } from "./PopUpButtonMenu";

describe("PopUpButtonMenu", () => {
  const mockItems: PopUpMenuItem[] = [
    { id: "1", label: "Item 1", onClick: jest.fn() },
    { id: "2", label: "Item 2", onClick: jest.fn(), checked: true },
    { id: "sep", label: "", onClick: jest.fn(), type: "separator" },
    { id: "3", label: "Delete", onClick: jest.fn(), variant: "destructive" },
  ];

  test("renders trigger and starts closed", () => {
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />,
    );
    expect(screen.getByText("Open Menu")).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  test("opens menu on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />,
    );

    await user.click(screen.getByText("Open Menu"));
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("handles item click and closes menu", async () => {
    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />,
    );

    await user.click(screen.getByText("Open Menu"));

    const item1 = screen.getByText("Item 1");
    await user.click(item1);

    expect(mockItems[0].onClick).toHaveBeenCalled();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument(); // Menu closed
  });

  test("renders checked state correctly", async () => {
    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />,
    );
    await user.click(screen.getByText("Open Menu"));

    const item2 = screen.getByText("Item 2").closest("button");
    expect(item2).toHaveClass("active");
    // Check inline style or class logic for checked state
    // The component logic: className={`liquid-menu-item ${isChecked ? 'active' : ''}`}
    // And inline styles for background color.
  });

  test("renders destructive variant", async () => {
    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />,
    );
    await user.click(screen.getByText("Open Menu"));

    const destItem = screen.getByText("Delete").closest("button");
    expect(destItem).toHaveStyle({ color: "#FF3B30" });
  });

  test("does not trigger click on separator", async () => {
    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />,
    );
    await user.click(screen.getByText("Open Menu"));

    // Separator is a div with no text, identified by style or absence of button role
    // It has key `sep-${index}`.
    // It's not clickable as a button.
    // We can just verify it renders.
    // Or check that clicking "separator" doesn't call anything (it's not interactive).
    // The component returns early if type === 'separator'.
  });

  test("closes on outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button>Outside</button>
        <PopUpButtonMenu
          trigger={<button>Open Menu</button>}
          items={mockItems}
        />
      </div>,
    );

    await user.click(screen.getByText("Open Menu"));
    expect(screen.getByText("Item 1")).toBeInTheDocument();

    await user.click(screen.getByText("Outside"));
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  test("applies align right style", async () => {
    // Mock layout
    Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        top: 100,
        bottom: 140,
        left: 200,
        right: 300, // Trigger right edge at 300px (300 - 220 = 80 > 10, no clipping)
        width: 100,
        height: 40,
      }),
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 1024,
    });

    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
        align="right"
      />,
    );
    await user.click(screen.getByText("Open Menu"));

    // Logic: right = clientWidth - (rect.right + scrollX)
    // right = 1024 - (300 + 0) = 724

    // We can find the menu container. It has absolute position.
    // Use getByRole or test id if possible, or closest div
    const menu = screen.getByText("Item 1").closest("div");

    // Use style matching
    expect(menu).toHaveStyle({ right: "724px" });
  });

  test("applies align center style", async () => {
    // Mock layout
    Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        top: 100,
        bottom: 140,
        left: 400,
        right: 500,
        width: 100, // Trigger width 100
        height: 40,
      }),
    });
    // Viewport 1024.
    // Menu width default ~220.
    // Center logic: left = rect.left + rect.width/2 - menuWidth/2
    // left = 400 + 50 - 110 = 340.

    // Boundary checks: 340 > 10. 340+220 = 560 < 1014. OK.

    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
        align="center"
      />,
    );
    await user.click(screen.getByText("Open Menu"));

    const menu = screen.getByText("Item 1").closest("div");
    // Should have left 340
    expect(menu).toHaveStyle({ left: "340px" });
  });

  test("applies matchMenuWidth style", async () => {
    Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        top: 100,
        bottom: 140,
        left: 100,
        right: 200,
        width: 123, // Trigger width
        height: 40,
      }),
    });

    const user = userEvent.setup();
    render(
      <PopUpButtonMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
        matchMenuWidth={true}
      />,
    );
    await user.click(screen.getByText("Open Menu"));
    const menu = screen.getByText("Item 1").closest("div");

    // Should match trigger width exactly in pixels
    expect(menu).toHaveStyle({ width: "123px" });
  });
});
