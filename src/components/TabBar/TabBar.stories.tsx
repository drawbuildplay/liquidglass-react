import type { Meta, StoryObj } from '@storybook/react';
import { TabBar } from './TabBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faBell, faEnvelope, faCamera } from '@fortawesome/free-solid-svg-icons';

const meta = {
    title: 'Components/TabBar',
    component: TabBar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
    { id: '1', label: 'Home', icon: <FontAwesomeIcon icon={faHome} /> },
    { id: '2', label: 'Profile', icon: <FontAwesomeIcon icon={faUser} /> },
    { id: '3', label: 'Settings', icon: <FontAwesomeIcon icon={faCog} /> },
];

export const Default: Story = {
    args: {
        items,
        activeTabId: '1',
    },
};

export const WithSearch: Story = {
    args: {
        items: [...items, { id: '4', label: 'Notifications', icon: <FontAwesomeIcon icon={faBell} /> }],
        activeTabId: '1',
        showSearch: true,
    },
};

export const TwoItems: Story = {
    args: {
        items: [
            { id: '1', label: 'Home', icon: <FontAwesomeIcon icon={faHome} /> },
            { id: '2', label: 'Profile', icon: <FontAwesomeIcon icon={faUser} /> },
        ],
        activeTabId: '1',
    }
};

export const ManyItems: Story = {
    args: {
        items: [
            ...items,
            { id: '4', label: 'Inbox', icon: <FontAwesomeIcon icon={faEnvelope} /> },
            { id: '5', label: 'Camera', icon: <FontAwesomeIcon icon={faCamera} /> },
            { id: '6', label: 'Alerts', icon: <FontAwesomeIcon icon={faBell} /> },
        ],
        activeTabId: '1',
    }
};
