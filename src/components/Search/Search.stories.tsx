import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';
import { useState } from 'react';

const meta: Meta<typeof Search> = {
    title: 'Components/Search',
    component: Search,
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
type Story = StoryObj<typeof Search>;

export const Default: Story = {
    render: (args) => {
        const [val, setVal] = useState('');
        return <Search {...args} value={val} onChange={setVal} />;
    },
    args: {
        placeholder: 'Search...',
        onSearch: (t) => console.log('Search:', t),
    },
};

export const Transparent: Story = {
    render: (args) => {
        const [val, setVal] = useState('');
        return <Search {...args} value={val} onChange={setVal} />;
    },
    args: {
        placeholder: 'Transparent Search',
        variant: 'transparent',
    },
};

export const WithButtons: Story = {
    render: (args) => {
        const [val, setVal] = useState('');
        return <Search {...args} value={val} onChange={setVal} />;
    },
    args: {
        placeholder: 'Search with buttons',
        showCloseButton: true,
        showSearchButton: true,
    }
}
