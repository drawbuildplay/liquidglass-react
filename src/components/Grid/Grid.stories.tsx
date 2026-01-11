import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Box = () => (
  <div
    style={{
      height: "100px",
      background: "rgba(0, 122, 255, 0.1)",
      border: "1px solid rgba(0, 122, 255, 0.2)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Item
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 12 }).map((_, i) => (
          <Box key={i} />
        ))}
      </>
    ),
  },
};

export const ManyItems: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 50 }).map((_, i) => (
          <Box key={i} />
        ))}
      </>
    ),
  },
};
