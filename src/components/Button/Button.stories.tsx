import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Button',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        variant: 'secondary',
    },
};

export const WithIcon: Story = {
    args: {
        label: 'Save',
        icon: faCheck,
    },
};

export const IconOnly: Story = {
    args: {
        icon: faTimes,
        variant: 'secondary',
    },
};

export const Danger: Story = {
    args: {
        label: 'Delete',
        variant: 'danger',
        icon: faTimes,
    },
};
