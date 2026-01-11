import type { Meta, StoryObj } from "@storybook/react";
import { Overlay } from "./Overlay";
import { Button } from "../Button/Button";
import { useState } from "react";

const meta: Meta<typeof Overlay> = {
  title: "Components/Overlay",
  component: Overlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button label="Open Overlay" onClick={() => setIsOpen(true)} />
        <Overlay {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              minWidth: "300px",
            }}
          >
            <h3>Overlay Content</h3>
            <p>Click outside to close.</p>
          </div>
        </Overlay>
      </div>
    );
  },
  args: {
    isOpen: false,
  },
};
