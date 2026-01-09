import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
    test("renders title and message when open", () => {
        // Portal renders to body
        render(
            <Alert
                isOpen={true}
                title="Warning"
                message="Are you sure?"
                actions={[]}
            />,
        );
        expect(screen.getByText("Warning")).toBeInTheDocument();
        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    });

    test("does not render when closed", () => {
        render(
            <Alert
                isOpen={false}
                title="Hidden"
                message="Invisible"
                actions={[]}
            />,
        );
        expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    });

    test("renders actions and handles clicks", () => {
        const handleOk = jest.fn();
        const handleCancel = jest.fn();
        const onClose = jest.fn(); // Alert calls onClose in actions wrapper often?
        // Implementation: onClick={() => { action.onClick(); onClose?.(); }}

        const actions = [
            { label: "Cancel", onClick: handleCancel, variant: "cancel" as const },
            { label: "OK", onClick: handleOk },
        ];

        render(
            <Alert
                isOpen={true}
                title="Actionable"
                actions={actions}
                onClose={onClose}
            />,
        );

        fireEvent.click(screen.getByText("OK"));
        expect(handleOk).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();

        fireEvent.click(screen.getByText("Cancel"));
        expect(handleCancel).toHaveBeenCalled();
    });
});
