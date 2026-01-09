import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { SwipeableRow } from "./SwipeableRow";

describe("SwipeableRow", () => {
  test("renders children", () => {
    render(
      <SwipeableRow>
        <div>Row Content</div>
      </SwipeableRow>,
    );
    expect(screen.getByText("Row Content")).toBeInTheDocument();
  });

  test("handles swipe left (delete) with mouse", async () => {
    const onSwipeLeft = jest.fn();
    render(
      <SwipeableRow onSwipeLeft={onSwipeLeft} threshold={50}>
        <div>Row Content</div>
      </SwipeableRow>,
    );

    const content = screen
      .getByText("Row Content")
      .closest(".swipeable-row-content");

    fireEvent.mouseDown(content!, { clientX: 100 });
    fireEvent.mouseMove(content!, { clientX: 40 }); // -60 diff
    fireEvent.mouseUp(content!);

    await waitFor(() => {
      expect(onSwipeLeft).toHaveBeenCalled();
    });
  });

  test("handles swipe right (action) with mouse", async () => {
    const onSwipeRight = jest.fn();
    render(
      <SwipeableRow onSwipeRight={onSwipeRight} threshold={50}>
        <div>Row Content</div>
      </SwipeableRow>,
    );

    const content = screen
      .getByText("Row Content")
      .closest(".swipeable-row-content");

    fireEvent.mouseDown(content!, { clientX: 100 });
    fireEvent.mouseMove(content!, { clientX: 160 }); // +60 diff
    fireEvent.mouseUp(content!);

    await waitFor(() => {
      expect(onSwipeRight).toHaveBeenCalled();
    });
  });

  test("resets if threshold not met", async () => {
    const onSwipeLeft = jest.fn();
    render(
      <SwipeableRow onSwipeLeft={onSwipeLeft} threshold={100}>
        <div>Row Content</div>
      </SwipeableRow>,
    );

    const content = screen
      .getByText("Row Content")
      .closest(".swipeable-row-content");

    fireEvent.mouseDown(content!, { clientX: 100 });
    fireEvent.mouseMove(content!, { clientX: 80 }); // -20 diff
    fireEvent.mouseUp(content!);

    // Expect NO call. Wait to ensure timeout didn't fire.
    await new Promise((r) => setTimeout(r, 400));
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });

  test("prevents click propagation during swipe", () => {
    const onClick = jest.fn();
    render(
      <SwipeableRow onSwipeLeft={jest.fn()}>
        <div onClick={onClick}>Row Content</div>
      </SwipeableRow>,
    );

    const content = screen
      .getByText("Row Content")
      .closest(".swipeable-row-content");
    const child = screen.getByText("Row Content");

    // Simulate swipe sequence
    fireEvent.mouseDown(content!, { clientX: 100 });
    fireEvent.mouseMove(content!, { clientX: 40 }); // Significant move
    fireEvent.mouseUp(content!);

    // Now simulate a click event on the CHILD
    fireEvent.click(child);

    expect(onClick).not.toHaveBeenCalled();
  });

  test("allows click if no swipe occurred", () => {
    const onClick = jest.fn();
    render(
      <SwipeableRow onSwipeLeft={jest.fn()}>
        <div onClick={onClick}>Row Content</div>
      </SwipeableRow>,
    );

    const content = screen
      .getByText("Row Content")
      .closest(".swipeable-row-content");
    const child = screen.getByText("Row Content");

    // Just click without move
    fireEvent.mouseDown(content!, { clientX: 100 });
    fireEvent.mouseUp(content!); // No move
    fireEvent.click(child);

    expect(onClick).toHaveBeenCalled();
  });
});
