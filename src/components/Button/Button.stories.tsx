import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { faCoffee, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "glass"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
    variant: "secondary",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Coffee",
    icon: faCoffee,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Next",
    rightIcon: faArrowRight,
    variant: "primary",
  },
};

export const Glass: Story = {
  args: {
    label: "Glass Effect",
    variant: "glass",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};
