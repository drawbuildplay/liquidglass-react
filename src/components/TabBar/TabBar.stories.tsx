import type { Meta, StoryObj } from '@storybook/react';
import { TabBar } from './TabBar';
import { faHome, faUser, faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const meta: Meta<typeof TabBar> = {
    title: 'Components/TabBar',
    component: TabBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TabBar>;

const items = [
    { id: 'home', label: 'Home', icon: <FontAwesomeIcon icon={faHome} /> },
    { id: 'search', label: 'Search', icon: <FontAwesomeIcon icon={faUser} /> }, // Intentionally weird icon for demo
    { id: 'alerts', label: 'Alerts', icon: <FontAwesomeIcon icon={faBell} /> },
    { id: 'settings', label: 'Settings', icon: <FontAwesomeIcon icon={faCog} /> },
];

export const Default: Story = {
    render: (args) => {
        const [active, setActive] = useState('home');
        return <TabBar {...args} activeTabId={active} onTabChange={setActive} />;
    },
    args: {
        items: items,
    },
};

export const WithSearch: Story = {
    render: (args) => {
        const [active, setActive] = useState('home');
        return <TabBar {...args} activeTabId={active} onTabChange={setActive} />;
    },
    args: {
        items: items,
        showSearch: true,
        onSearch: (q) => console.log('Search:', q),
    },
};
