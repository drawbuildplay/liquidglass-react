import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        return <Checkbox {...args} checked={checked} onChange={setChecked} />;
    },
    args: {
        label: 'I agree to the terms',
    },
};

export const Checked: Story = {
    args: {
        label: 'Subscribe to newsletter',
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Option',
        disabled: true,
    },
};
