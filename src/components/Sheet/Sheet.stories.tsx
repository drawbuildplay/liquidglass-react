import type { Meta, StoryObj } from "@storybook/react";
import { Sheet } from "./Sheet";
import { Button } from "../Button/Button";
import { useState } from "react";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button label="Open Sheet" onClick={() => setIsOpen(true)} />
        <Sheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ padding: "20px" }}>
            <h2>Sheet Content</h2>
            <p>This is a bottom sheet on mobile and modal on desktop.</p>
            <Button
              label="Close"
              onClick={() => setIsOpen(false)}
              fullWidth
              variant="danger"
            />
          </div>
        </Sheet>
      </div>
    );
  },
  args: {
    forceMobile: true,
  },
};
