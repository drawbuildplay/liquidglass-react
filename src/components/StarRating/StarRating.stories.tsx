import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';
import { useState } from 'react';

const meta: Meta<typeof StarRating> = {
    title: 'Components/StarRating',
    component: StarRating,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Default: Story = {
    render: (args) => {
        const [rating, setRating] = useState(3);
        return <StarRating {...args} rating={rating} onChange={setRating} />;
    },
    args: {},
};

export const ReadOnly: Story = {
    args: {
        rating: 4,
        readonly: true,
    },
};

export const Large: Story = {
    render: (args) => {
        const [rating, setRating] = useState(5);
        return <StarRating {...args} rating={rating} onChange={setRating} />;
    },
    args: {
        size: 48,
    },
};
