import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: faBoxOpen,
    title: "No Items Found",
    description:
      "You haven't added any items yet. Start by creating a new one.",
    action: <Button label="Create Item" variant="primary" />,
  },
};

export const WithImage: Story = {
  args: {
    imageSrc: "https://via.placeholder.com/150",
    title: "No Connection",
    description: "Please check your internet connection and try again.",
    action: <Button label="Retry" variant="secondary" />,
  },
};
