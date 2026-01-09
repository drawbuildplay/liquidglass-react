import type { Meta, StoryObj } from '@storybook/react';
import { ShareButton } from './ShareButton';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof ShareButton> = {
    title: 'Components/ShareButton',
    component: ShareButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ShareButton>;

export const Default: Story = {
    args: {
        label: 'Share',
        url: 'https://example.com',
        shareTitle: 'Example',
        text: 'Check this out!',
        variant: 'primary',
    },
};

export const IconOnly: Story = {
    args: {
        icon: faShare,
        url: 'https://example.com',
        shareTitle: 'Icon Example',
        variant: 'ghost',
    },
};
