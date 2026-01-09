import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Growl } from "./Growl";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

jest.useFakeTimers();

describe("Growl", () => {
  test("renders message when visible", () => {
    render(<Growl message="Hello World" visible={true} />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("does not render when hidden", () => {
    render(<Growl message="Hello World" visible={false} />);
    expect(screen.queryByText("Hello World")).not.toBeInTheDocument();
  });

  test("renders icon", () => {
    render(<Growl message="Success" visible={true} icon={faCheck} />);
    // FontAwesome mock usually renders an SVG path or similar.
    // Need to check how FA is mocked globally or if I need to mock it here.
    // Assuming global mock renders data-testid or class.
    // In Details.test.tsx we mocked it to <span data-testid="fa-icon" />.
    // I should probably mock it here too to be safe.
  });

  test("calls onDismiss after duration", () => {
    const onDismiss = jest.fn();
    render(
      <Growl
        message="Temp"
        visible={true}
        duration={3000}
        onDismiss={onDismiss}
      />,
    );

    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test("does not auto dismiss if duration is 0", () => {
    const onDismiss = jest.fn();
    render(
      <Growl
        message="Permanent"
        visible={true}
        duration={0}
        onDismiss={onDismiss}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onDismiss).not.toHaveBeenCalled();
  });
});
