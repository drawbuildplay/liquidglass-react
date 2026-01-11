import type { Meta, StoryObj } from "@storybook/react";
import { PopUpButtonMenu } from "./PopUpButtonMenu";
import { Button } from "../Button/Button";
import {
  faEllipsisH,
  faEdit,
  faTrash,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof PopUpButtonMenu> = {
  title: "Components/PopUpButtonMenu",
  component: PopUpButtonMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PopUpButtonMenu>;

export const Default: Story = {
  args: {
    trigger: <Button icon={faEllipsisH} variant="secondary" />,
    items: [
      {
        id: "edit",
        label: "Edit",
        icon: faEdit,
        onClick: () => console.log("Edit"),
      },
      {
        id: "copy",
        label: "Copy",
        icon: faCopy,
        onClick: () => console.log("Copy"),
      },
      { id: "sep1", label: "", type: "separator", onClick: () => {} },
      {
        id: "delete",
        label: "Delete",
        icon: faTrash,
        variant: "destructive",
        onClick: () => console.log("Delete"),
      },
    ],
    align: "left",
  },
};

export const RightAligned: Story = {
  args: {
    trigger: <Button label="Options" variant="primary" />,
    items: [
      { id: "opt1", label: "Option 1", onClick: () => {} },
      { id: "opt2", label: "Option 2", onClick: () => {} },
    ],
    align: "right",
  },
};
