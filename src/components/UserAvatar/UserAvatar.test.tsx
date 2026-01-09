import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserAvatar } from "./UserAvatar";

describe("UserAvatar", () => {
    test("renders with default fallback image when no photo provided", () => {
        render(<UserAvatar displayName="Test User" />);
        const img = screen.getByAltText("Test User");
        // Should have src containing disappointment.png (default)
        expect(img).toHaveAttribute("src", "/disappointment.png");
    });

    test("renders photoURL when provided", () => {
        const url = "https://example.com/photo.jpg";
        render(<UserAvatar displayName="Test User" photoURL={url} />);
        const img = screen.getByAltText("Test User");
        expect(img).toHaveAttribute("src", url);
    });

    test("favors explicit photoURL over user object", () => {
        const user = { photoURL: "http://user.com/pic.jpg", displayName: "UserObj" };
        render(
            <UserAvatar
                user={user}
                photoURL="http://explicit.com/pic.jpg"
                displayName="Explicit"
            />,
        );
        const img = screen.getByAltText("Explicit");
        expect(img).toHaveAttribute("src", "http://explicit.com/pic.jpg");
    });

    test("applies size style", () => {
        render(<UserAvatar size="50px" />);
        const container = screen.getByRole("img").parentElement; // img is inside container
        // wait, role img on img tag. Container wraps it.
        // The component returns div with style.
        // Let's find by generic container or just check text if needed, but no text.
        // Container has class "user-avatar-container".
        // We can verify style on the div.
        // BUT we don't have getByClass.
        // We can use container.firstChild.
        // Or render and assign result to var?
        // screen.getByRole('img') returns the image. parent is the div.
        const img = screen.getByRole("img");
        const div = img.parentElement;
        expect(div).toHaveStyle({ width: "50px", height: "50px" });
    });

    test("handles image error by showing fallback", () => {
        render(
            <UserAvatar
                photoURL="http://broken.com/img.jpg"
                displayName="Broken"
                levelDefaultImage="/fallback.png"
            />,
        );
        const img = screen.getByAltText("Broken");
        // Trigger error
        fireEvent.error(img);
        // Should switch to fallback
        expect(img).toHaveAttribute("src", "/fallback.png");
    });
});
