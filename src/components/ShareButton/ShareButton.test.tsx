import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ShareButton } from "./ShareButton";
import { vi } from "vitest";

// Mock Button
vi.mock("../Button/Button", () => ({
    Button: ({ onClick, children, icon }: any) => (
        <button onClick={onClick} data-testid="share-btn">
            {children || (icon ? "Icon" : "Btn")}
        </button>
    ),
}));

// Mock Navigator globals
const mockShare = vi.fn();
const mockWriteText = vi.fn();

Object.assign(navigator, {
    share: mockShare,
    clipboard: {
        writeText: mockWriteText,
    },
});

describe("ShareButton", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("calls navigator.share if available", async () => {
        // navigator.share is mocked above
        render(<ShareButton url="https://example.com" title="Example" />);

        // We assume navigator.share is truthy because we mocked it
        fireEvent.click(screen.getByTestId("share-btn"));

        // Wait for async
        await new Promise(process.nextTick);

        expect(mockShare).toHaveBeenCalledWith({
            title: expect.anything(), // Defaults exist
            text: expect.anything(),
            url: "https://example.com",
        });
    });

    test("falls back to clipboard if share fails (simulated via manual trigger or if share undef)", async () => {
        // Temporarily remove share
        const originalShare = navigator.share;
        // @ts-ignore
        navigator.share = undefined;

        const onCopy = jest.fn();
        render(
            <ShareButton
                url="https://fallback.com"
                onCopy={onCopy}
            />,
        );

        fireEvent.click(screen.getByTestId("share-btn"));
        await new Promise(process.nextTick);

        expect(mockWriteText).toHaveBeenCalledWith("https://fallback.com");
        expect(onCopy).toHaveBeenCalled();

        // Restore
        navigator.share = originalShare;
    });

    test("falls back to legacy execCommand if clipboard API throws or missing", async () => {
        // Remove share and clipboard
        const originalShare = navigator.share;
        const originalClipboard = navigator.clipboard;
        // @ts-ignore
        navigator.share = undefined;
        // @ts-ignore
        navigator.clipboard = undefined;

        // Mock execCommand
        const execCommand = vi.fn(() => true);
        document.execCommand = execCommand;

        // Mock body.appendChild & removeChild
        const appendChild = vi.spyOn(document.body, "appendChild");
        const removeChild = vi.spyOn(document.body, "removeChild");

        const onCopy = vi.fn();
        render(<ShareButton url="https://legacy.com" onCopy={onCopy} />);

        fireEvent.click(screen.getByTestId("share-btn"));
        await new Promise(process.nextTick);

        expect(execCommand).toHaveBeenCalledWith("copy");
        expect(appendChild).toHaveBeenCalled();
        expect(removeChild).toHaveBeenCalled();
        expect(onCopy).toHaveBeenCalled();

        // Restore
        navigator.share = originalShare;
        navigator.clipboard = originalClipboard;
    });
});
