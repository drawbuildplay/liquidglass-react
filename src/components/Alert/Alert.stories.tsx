import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import { Button } from "../Button/Button";
import { useState } from "react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button label="Open Alert" onClick={() => setIsOpen(true)} />
        <Alert {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed? This action cannot be undone.",
    actions: [
      {
        label: "Cancel",
        onClick: () => console.log("Cancel"),
        variant: "cancel",
      },
      {
        label: "Delete",
        onClick: () => console.log("Delete"),
        variant: "destructive",
      },
    ],
    isOpen: true,
  },
};
