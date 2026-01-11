import type { Meta, StoryObj } from "@storybook/react";
import { ComboBox } from "./ComboBox";

const meta: Meta<typeof ComboBox> = {
  title: "Components/ComboBox",
  component: ComboBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {
  args: {
    label: "Choose an option",
    children: (
      <>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};

export const Transparent: Story = {
  args: {
    label: "Sort By",
    variant: "transparent",
    children: (
      <>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="popular">Most Popular</option>
      </>
    ),
  },
};
