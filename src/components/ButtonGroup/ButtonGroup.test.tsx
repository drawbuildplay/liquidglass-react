import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ButtonGroup, type ButtonGroupItem } from "./ButtonGroup";
import { vi } from "vitest";
import { faHome } from "@fortawesome/free-solid-svg-icons";

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

// Mock PopUpButtonMenu to simplify overflow testing
vi.mock("../PopUpButtonMenu/PopUpButtonMenu", () => ({
  PopUpButtonMenu: ({ trigger, items }: any) => (
    <div data-testid="popup-menu">
      <div data-testid="popup-trigger">{trigger}</div>
      <div data-testid="popup-items">
        {items.map((item: any) => (
          <button
            key={item.id}
            onClick={item.onClick}
            data-testid={`menu-item-${item.id}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  ),
  PopUpMenuItem: {},
}));

describe("ButtonGroup", () => {
  const mockMatchMedia = (matches: boolean) =>
    vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

  beforeEach(() => {
    window.matchMedia = mockMatchMedia(true); // Default Desktop
  });

  test("renders items", () => {
    const items: ButtonGroupItem[] = [
      { id: "1", icon: faHome, onClick: vi.fn(), label: "Home" },
      { id: "2", icon: faHome, onClick: vi.fn(), label: "Settings" },
    ];
    render(<ButtonGroup items={items} />);
    expect(screen.getByTitle("Home")).toBeInTheDocument();
    expect(screen.getByTitle("Settings")).toBeInTheDocument();
  });

  test("handles clicks on items", () => {
    const handleClick = vi.fn();
    const items: ButtonGroupItem[] = [
      { id: "1", icon: faHome, onClick: handleClick, label: "ClickMe" },
    ];
    render(<ButtonGroup items={items} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  test("handles responsive overflow (desktop -> mobile)", () => {
    // Force mobile
    window.matchMedia = mockMatchMedia(false);

    // 5 items. Mobile max is 4 slots (3 visible + ellipsis).
    const items = Array.from({ length: 5 }).map((_, i) => ({
      id: `${i}`,
      icon: faHome,
      onClick: vi.fn(),
      label: `Item ${i}`,
    }));

    render(<ButtonGroup items={items} />);

    // Should show overflow menu
    expect(screen.getByTestId("popup-menu")).toBeInTheDocument();

    // Visible items should be last 3: Item 2, 3, 4
    expect(screen.getByTitle("Item 2")).toBeInTheDocument();
    expect(screen.getByTitle("Item 4")).toBeInTheDocument();

    // Overflow items should be first 2: Item 0, 1
    // We mocked PopUpButtonMenu to render items always (for test visibility)
    expect(screen.getByTestId("menu-item-0")).toBeInTheDocument();
    expect(screen.queryByTitle("Item 0")).not.toBeInTheDocument(); // Not in main bar
  });

  test("returns null if no items", () => {
    const { container } = render(<ButtonGroup items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
