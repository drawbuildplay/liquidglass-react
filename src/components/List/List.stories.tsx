import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem, ListCard } from "./List";
import {
  faChevronRight,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <List {...args}>
        <ListItem>
          <ListCard
            left={
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: "24px", color: "#007aff" }}
              />
            }
            right={
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ fontSize: "14px", opacity: 0.3 }}
              />
            }
          >
            <div style={{ fontWeight: 600 }}>User Profile</div>
            <div style={{ fontSize: "13px", opacity: 0.6 }}>
              Manage your account settings
            </div>
          </ListCard>
        </ListItem>
        <ListItem>
          <ListCard
            right={
              <span style={{ fontWeight: 600, color: "#8e8e93" }}>On</span>
            }
          >
            <div style={{ fontWeight: 600 }}>Notifications</div>
          </ListCard>
        </ListItem>
        <ListItem>
          <ListCard>
            <div style={{ fontWeight: 600, color: "#FF3B30" }}>Log Out</div>
          </ListCard>
        </ListItem>
      </List>
    </div>
  ),
  args: {},
};
