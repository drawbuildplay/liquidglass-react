import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { List, ListItem, ListCard } from "./List";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Mock FontAwesomeIcon to avoid issues
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

describe("List", () => {
  test("renders List container", () => {
    render(
      <List className="test-list">
        <ListItem>Item 1</ListItem>
      </List>,
    );
    // liquid-list class is used in List.tsx
    const list = screen.getByText("Item 1").closest(".liquid-list");
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass("test-list");
  });

  test("renders ListItem with title and subtitle", () => {
    render(
      <ListItem title="Title" subtitle="Subtitle">
        Content
      </ListItem>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("handles ListItem onClick", () => {
    const handleClick = jest.fn();
    render(<ListItem onClick={handleClick}>Clickable</ListItem>);
    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders ListCard with left/right elements", () => {
    render(
      <ListCard
        left={<span data-testid="left">Left</span>}
        right={<span data-testid="right">Right</span>}
      >
        Center
      </ListCard>,
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
    expect(screen.getByText("Center")).toBeInTheDocument();
  });
});
