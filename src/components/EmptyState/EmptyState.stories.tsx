import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';
import { faInbox, faSearch } from '@fortawesome/free-solid-svg-icons';

const meta = {
    title: 'Components/EmptyState',
    component: EmptyState,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'No Items Found',
        description: 'Try adjusting your search or filter to find what you are looking for.',
        icon: faSearch,
    },
};

export const WithAction: Story = {
    args: {
        title: 'No Messages',
        description: 'You have no new messages in your inbox.',
        icon: faInbox,
        action: <Button label="Refresh" variant="primary" onClick={() => console.log('Refresh')} />,
    },
};
