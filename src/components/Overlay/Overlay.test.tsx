import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Overlay } from "./Overlay";

describe("Overlay", () => {
    test("renders children into body when open", () => {
        render(
            <Overlay isOpen={true}>
                <div data-testid="overlay-content">Content</div>
            </Overlay>,
        );
        expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
        // Verify portal location?
        // By default check if it exists is enough for logic
    });

    test("handles backdrop click to close", () => {
        const onClose = jest.fn();
        render(
            <Overlay isOpen={true} onClose={onClose}>
                <div data-testid="content">Content</div>
            </Overlay>,
        );

        // Overlay structure: Outer div (backdrop) -> Inner div (content wrapper)
        // Clicking backdrop should triggers onClose.
        // Clicking content should stop propagation.

        // We can't easily click backdrop because it covers everything.
        // But testing-library renders it.
        // The rendered structure is <div onClick={onClose}><div onClick={stop}>...</div></div>

        // Find the outer div.
        const content = screen.getByTestId("content");
        const wrapper = content.parentElement; // inner div
        const backdrop = wrapper?.parentElement; // outer div

        if (!backdrop) throw new Error("Backdrop not found");

        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalled();
    });

    test("clicking content does not close", () => {
        const onClose = jest.fn();
        render(
            <Overlay isOpen={true} onClose={onClose}>
                <div data-testid="content">Content</div>
            </Overlay>,
        );
        fireEvent.click(screen.getByTestId("content"));
        expect(onClose).not.toHaveBeenCalled();
    });
});
