import type { Meta, StoryObj } from "@storybook/react";
import { Toolbar } from "./Toolbar";
import { Button } from "../Button/Button";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {
    title: "Page Title",
    leftElement: <Button icon={faBars} variant="ghost" />,
    rightElement: <Button icon={faSearch} variant="ghost" />,
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <div
        style={{
          background: "#eee",
          padding: "4px 12px",
          borderRadius: "8px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Search Bar Placeholder
      </div>
    ),
    leftElement: <Button icon={faBars} variant="ghost" />,
  },
};
