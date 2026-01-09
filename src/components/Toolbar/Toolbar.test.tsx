import React from "react";
import { render, screen } from "@testing-library/react";
import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
    test("renders title", () => {
        render(<Toolbar title="Page Title" />);
        expect(screen.getByText("Page Title")).toBeInTheDocument();
    });

    test("renders left and right elements", () => {
        render(
            <Toolbar
                title="Title"
                leftElement={<button>Back</button>}
                rightElement={<button>Save</button>}
            />,
        );
        expect(screen.getByText("Back")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    test("renders children", () => {
        render(
            <Toolbar>
                <div>Child Content</div>
            </Toolbar>,
        );
        expect(screen.getByText("Child Content")).toBeInTheDocument();
    });
});
