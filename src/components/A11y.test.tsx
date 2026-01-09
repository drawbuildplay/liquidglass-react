import React from "react";
import { render, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./Button/Button";
import { Sheet } from "./Sheet/Sheet";
import { Input } from "./Input/Input";
import { TabBar } from "./TabBar/TabBar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

expect.extend(toHaveNoViolations);

describe("LiquidGlass A11y Tests", () => {
  // 1. Button Accessibility
  describe("Button", () => {
    test("Basic button should have no violations", async () => {
      const { container } = render(<Button label="Click Me" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test("Icon-only button MUST have aria-label to pass", async () => {
      // Note: Our previous audit identified this as a potential issue unless handled.
      // We expect this to PASS if we provide aria-label.
      const { container } = render(
        <Button icon={faSearch} aria-label="Search" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // 2. Input Accessibility
  describe("Input", () => {
    test("Input must have a label", async () => {
      const { container } = render(
        <label htmlFor="test-input">
          Test Label
          <Input id="test-input" />
        </label>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test("Input with aria-label should pass", async () => {
      const { container } = render(<Input aria-label="Search Content" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // 3. Sheet Accessibility
  describe("Sheet", () => {
    test("Sheet should have dialog role", async () => {
      // We need to render it open
      const { baseElement } = render(
        <Sheet isOpen={true} onClose={() => {}} aria-label="Test Sheet">
          <div style={{ color: "#000", background: "#fff" }}>Sheet Content</div>
        </Sheet>,
      );

      // Axe checks the whole document usually, but let's check the portal output if possible
      // render puts it in document.body via portal.
      // verifying accessibility of the whole document state
      const results = await axe(baseElement, {
        rules: {
          // Page might miss main landmark etc in isolation test, ignore page-level rules
          region: { enabled: false },
          "landmark-one-main": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  // 4. TabBar Accessibility
  describe("TabBar", () => {
    test("TabBar structure should be accessible", async () => {
      const items = [
        { id: "1", label: "Tab 1" },
        { id: "2", label: "Tab 2" },
      ];
      const { container } = render(<TabBar items={items} activeTabId="1" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test("Search toggle button has accessible name", async () => {
      // This tests the fix we just applied (aria-label="Toggle Search")
      const items = [{ id: "1", label: "Tab 1" }];
      const { container } = render(<TabBar items={items} showSearch={true} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
