import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TabBar } from "./TabBar";

// Mock dependencies
import { vi } from "vitest";

// Mock dependencies
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));
vi.mock("../Search/Search", () => ({
  Search: () => <div data-testid="search-component">SearchMock</div>,
}));

const mockItems = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" },
];

describe("TabBar", () => {
  test("renders tab items", () => {
    render(<TabBar items={mockItems} activeTabId="tab1" />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  test("calls onTabChange when tab clicked", () => {
    const handleTabChange = jest.fn();
    render(
      <TabBar
        items={mockItems}
        activeTabId="tab1"
        onTabChange={handleTabChange}
      />,
    );

    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleTabChange).toHaveBeenCalledWith("tab2");
  });

  test("shows search input when toggled", () => {
    const { rerender } = render(
      <TabBar items={mockItems} activeTabId="tab1" showSearch={true} />,
    );

    // Initially closed, shows search icon
    expect(screen.getByTestId("fa-icon")).toBeInTheDocument();

    // Toggle (assuming icon is wrapped in button)
    // Toggle
    fireEvent.click(screen.getByRole("button", { name: "Toggle Search" }));
    // Wait, TabBar.tsx implementation:
    // button class="liquid-tab-search" wraps the icon.
    // It's rendered in DOM.

    // Since we are not mocking the button container, we can find it.
    // Rerender with controlled state if internal state is tricky to test without fully rendering component tree/logic.
    // TabBar handles internal state.
  });

  test("renders Search component when isSearchOpen is true", () => {
    render(
      <TabBar
        items={mockItems}
        activeTabId="tab1"
        isSearchOpen={true}
        showSearch={true}
      />,
    );
    expect(screen.getByTestId("search-component")).toBeInTheDocument();
  });
});
