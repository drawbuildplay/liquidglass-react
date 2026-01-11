import type { Meta, StoryObj } from "@storybook/react";
import { UserAvatar } from "./UserAvatar";

const meta: Meta<typeof UserAvatar> = {
  title: "Components/UserAvatar",
  component: UserAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "text" },
    displayName: { control: "text" },
    photoURL: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: {
    size: "60px",
    displayName: "John Doe",
  },
};

export const WithPhoto: Story = {
  args: {
    size: "80px",
    displayName: "Jane Smith",
    photoURL:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
};

export const WithUserObject: Story = {
  args: {
    size: "60px",
    user: {
      displayName: "Alice",
      photoURL:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  },
};

export const Fallback: Story = {
  args: {
    size: "60px",
    displayName: "Unknown User",
    // No photoURL, should fallback
  },
};
