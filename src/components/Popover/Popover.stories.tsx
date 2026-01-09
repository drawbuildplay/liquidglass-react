import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div>
                <Button label="Open Popover" onClick={() => setIsOpen(true)} />
                <Popover {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div>
                        <p>This is a popover content.</p>
                        <Button label="Close" onClick={() => setIsOpen(false)} variant="secondary" />
                    </div>
                </Popover>
            </div>
        );
    },
    args: {
        title: 'Popover Title',
    },
};
