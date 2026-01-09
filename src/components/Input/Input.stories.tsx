import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'search', 'transparent'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text here...',
    },
};

export const SearchVariant: Story = {
    args: {
        variant: 'search',
        placeholder: 'Search...',
    },
};

export const WithLeftElement: Story = {
    args: {
        placeholder: 'Email',
        leftElement: <FontAwesomeIcon icon={faEnvelope} style={{ color: '#8e8e93' }} />,
    },
};

export const WithRightElement: Story = {
    args: {
        type: 'password',
        placeholder: 'Password',
        rightElement: <FontAwesomeIcon icon={faLock} style={{ color: '#8e8e93' }} />,
    },
};
