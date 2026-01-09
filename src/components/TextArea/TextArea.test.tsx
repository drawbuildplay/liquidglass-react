import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextArea } from "./TextArea";

describe("TextArea", () => {
  test("renders with placeholder", () => {
    render(<TextArea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("handles onChange", () => {
    const onChange = jest.fn();
    render(<TextArea onChange={onChange} />);

    // Textarea role is 'textbox'. But it might collide with others if generic.
    // It's the only one here.
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue("New Value");
  });

  test("applies transparent variant style", () => {
    render(<TextArea variant="transparent" placeholder="Trans" />);
    const wrapper = screen.getByPlaceholderText("Trans").closest("div");
    // Wrapper inside container.
    // The wrapper div has background logic.
    // background: isTransparent ? 'transparent' : 'rgba(0,0,0,0.05)'
    // But styles are inline.
    expect(wrapper).toHaveStyle({ background: "transparent" });
  });

  test("applies height prop", () => {
    render(<TextArea height="200px" placeholder="Tall" />);
    const input = screen.getByPlaceholderText("Tall");
    expect(input).toHaveStyle({ height: "200px" });
  });
});
