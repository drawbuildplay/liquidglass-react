import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from './Sheet';
import { useState } from 'react';

const meta = {
    title: 'Components/Sheet',
    component: Sheet,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const Wrapper = (args: any) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div style={{ padding: 20 }}>
            <button onClick={() => setIsOpen(true)}>Open Sheet</button>
            <Sheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div style={{ padding: 20 }}>
                    <h2>Sheet Content</h2>
                    <p>This is a modal sheet that slides up from the bottom.</p>
                    <p>It can contain any custom content.</p>
                </div>
            </Sheet>
        </div>
    );
};

export const Default: Story = {
    render: (args) => <Wrapper {...args} />,
    args: {
        isOpen: true,
        height: '50%',
        children: <div>Sheet Content</div>,
    },
};
