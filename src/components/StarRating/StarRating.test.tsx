import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StarRating } from "./StarRating";

import { vi } from "vitest";

// Mock FontAwesomeIcon to make it easier to find
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }: any) => (
    <span data-testid="fa-icon">{icon.iconName}</span>
  ),
}));

describe("StarRating", () => {
  test("renders 5 stars", () => {
    render(<StarRating rating={0} />);
    const stars = screen.getAllByTestId("fa-icon");
    expect(stars).toHaveLength(5);
  });

  // Note: Visual state testing (colors) relies on inline styles now, which is harder to test
  // without more complex setup or checking computed styles.
  // For unit tests, verifying interaction logic is key.

  test("calls onChange when a star is clicked", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<StarRating rating={0} onChange={handleChange} />);

    // Find the wrapper spans (which have the onClick)
    // Since we can't easily select the span by text, we select by the icon inside
    const icons = screen.getAllByTestId("fa-icon");
    const starSpans = icons.map((icon) => icon.parentElement!);

    // Click the 4th star (index 3)
    await user.click(starSpans[3]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  test("does not call onChange when readonly", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<StarRating rating={3} onChange={handleChange} readonly />);

    const icons = screen.getAllByTestId("fa-icon");
    const starSpans = icons.map((icon) => icon.parentElement!);

    // Click the 4th star
    await user.click(starSpans[3]);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
