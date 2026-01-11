import type { Meta, StoryObj } from "@storybook/react";
import { Showcase } from "./Showcase";

const meta = {
  title: "Examples/Showcase",
  component: Showcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Showcase>;

export default meta;
type Story = StoryObj<typeof Showcase>;

export const MobileAppDemo: Story = {};
