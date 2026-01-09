import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import { vi } from "vitest";

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: () => <span data-testid="fa-check" />,
}));

describe("Checkbox", () => {
    test("renders label", () => {
        render(<Checkbox label="Accept Terms" />);
        expect(screen.getByText("Accept Terms")).toBeInTheDocument();
    });

    test("handles click to toggle", () => {
        const handleChange = jest.fn();
        render(<Checkbox label="Toggle" onChange={handleChange} checked={false} />);

        fireEvent.click(screen.getByText("Toggle"));
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    test("does not trigger when disabled", () => {
        const handleChange = jest.fn();
        render(
            <Checkbox label="Disabled" onChange={handleChange} disabled={true} />,
        );
        fireEvent.click(screen.getByText("Disabled"));
        expect(handleChange).not.toHaveBeenCalled();
    });

    test("renders check icon when checked", () => {
        render(<Checkbox checked={true} />);
        expect(screen.getByTestId("fa-check")).toBeInTheDocument();
    });
});
