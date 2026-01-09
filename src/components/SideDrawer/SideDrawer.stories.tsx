import type { Meta, StoryObj } from '@storybook/react';
import { SideDrawer } from './SideDrawer';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof SideDrawer> = {
    title: 'Components/SideDrawer',
    component: SideDrawer,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SideDrawer>;

export const Default: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div style={{ height: '300px', background: '#f5f5f5', position: 'relative' }}>
                <SideDrawer {...args} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
                    <div style={{ padding: '20px', width: '200px' }}>
                        <h3>Side Drawer</h3>
                        <p>Content goes here.</p>
                    </div>
                </SideDrawer>
                <div style={{ padding: '20px', marginLeft: isOpen ? '250px' : '50px', transition: 'margin 0.3s' }}>
                    Main Content Area
                </div>
            </div>
        );
    },
    args: {
        isOpen: true,
        position: 'left',
    },
};
