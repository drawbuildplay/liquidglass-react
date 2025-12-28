import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { useState } from 'react';

const meta = {
    title: 'Components/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for interactivity in docs
const AlertWrapper = (args: any) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Open Alert</button>
            <Alert {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}

export const Default: Story = {
    render: (args) => <AlertWrapper {...args} />,
    args: {
        isOpen: true,
        title: 'Delete Item?',
        message: 'This action cannot be undone.',
        actions: [
            { label: 'Cancel', onClick: () => console.log('Cancel'), variant: 'cancel' },
            { label: 'Delete', onClick: () => console.log('Delete'), variant: 'destructive' },
        ]
    },
};

export const SingleAction: Story = {
    render: (args) => <AlertWrapper {...args} />,
    args: {
        isOpen: true,
        title: 'Success',
        message: 'Item has been saved successfully.',
        actions: [
            { label: 'OK', onClick: () => console.log('OK'), variant: 'default' },
        ]
    },
};
