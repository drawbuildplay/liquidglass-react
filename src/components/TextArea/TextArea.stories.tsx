import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
    title: 'Components/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'transparent'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: {
        placeholder: 'Enter your comments here...',
        rows: 4,
    },
};

export const Transparent: Story = {
    args: {
        placeholder: 'Transparent text area',
        variant: 'transparent',
    },
};
