import type { Meta, StoryObj } from "@storybook/react";
import { SideDrawer } from "./SideDrawer";
import { useState } from "react";

const meta: Meta<typeof SideDrawer> = {
  title: "Components/SideDrawer",
  component: SideDrawer,

  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
### Inline & Push Layout
To create a layout where the drawer "pushes" the content (instead of floating over it), use the \`floating={false}\` prop.
**Important Requirements for Push Layout:**
1.  The \`SideDrawer\` must be a **flex sibling** of your main content container.
2.  Your main content container should have \`flex: 1\` to fill the remaining space.
3.  For responsive mobile behavior (full-page scrolling), ensure your root container allows \`auto\` height.

### Custom Width
You can customize the drawer width using the \`--drawer-width\` CSS variable passed to the \`style\` prop:
\`\`\`jsx
<SideDrawer style={{ '--drawer-width': '66vw' }} ... />
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideDrawer>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div
        style={{ height: "300px", background: "#f5f5f5", position: "relative" }}
      >
        <SideDrawer
          {...args}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <div style={{ padding: "20px", width: "200px" }}>
            <h3>Side Drawer</h3>
            <p>Content goes here.</p>
          </div>
        </SideDrawer>
        <div
          style={{
            padding: "20px",
            marginLeft: isOpen ? "250px" : "50px",
            transition: "margin 0.3s",
          }}
        >
          Main Content Area
        </div>
      </div>
    );
  },
  args: {
    isOpen: true,
    position: "left",
  },
};
