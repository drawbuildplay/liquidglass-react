import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { faHome, faUser, faCog, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof ButtonGroup> = {
    title: "Components/ButtonGroup",
    component: ButtonGroup,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const items = [
    { id: "1", icon: faHome, label: "Home", onClick: () => console.log("Home") },
    { id: "2", icon: faSearch, label: "Search", onClick: () => console.log("Search"), active: true },
    { id: "3", icon: faBell, label: "Notifications", onClick: () => console.log("Bell") },
    { id: "4", icon: faUser, label: "Profile", onClick: () => console.log("Profile") },
];

export const Primary: Story = {
    args: {
        items: items,
        variant: "primary",
    },
};

export const Overflow: Story = {
    args: {
        items: [
            ...items,
            { id: "5", icon: faCog, label: "Settings", onClick: () => { } },
            { id: "6", icon: faHome, label: "Extra", onClick: () => { } },
            { id: "7", icon: faUser, label: "More", onClick: () => { } },
        ],
        variant: "glass",
    },
};
