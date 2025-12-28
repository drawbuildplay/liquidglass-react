import type { Meta, StoryObj } from '@storybook/react';
import { PopUpButtonMenu } from './PopUpButtonMenu';
import { Button } from '../Button/Button';
import { faFilter, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const meta = {
    title: 'Components/PopUpButtonMenu',
    component: PopUpButtonMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // Add decorator to provide scrolling space
    decorators: [
        (Story) => (
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '50px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PopUpButtonMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: <Button label="Options" variant="secondary" icon={faEllipsisH} />,
        items: [
            { id: '1', label: 'Edit', onClick: () => console.log('Edit') },
            { id: '2', label: 'Duplicate', onClick: () => console.log('Duplicate') },
            { id: 'sep1', label: '', onClick: () => { }, type: 'separator' },
            { id: '3', label: 'Delete', onClick: () => console.log('Delete'), variant: 'destructive' },
        ],
    },
};

export const FilterMenu: Story = {
    args: {
        trigger: <Button label="Filter By" variant="primary" icon={faFilter} />,
        items: [
            { id: 'all', label: 'All Items', onClick: () => console.log('All'), checked: true },
            { id: 'active', label: 'Active', onClick: () => console.log('Active') },
            { id: 'completed', label: 'Completed', onClick: () => console.log('Completed') },
            { id: 'sep1', label: '', onClick: () => { }, type: 'separator' },
            { id: 'custom', label: 'Custom Range...', onClick: () => console.log('Custom') },
        ],
    },
};

export const RightAligned: Story = {
    args: {
        align: 'right',
        trigger: <Button variant="ghost" icon={faEllipsisH} />,
        items: [
            { id: '1', label: 'Settings', onClick: () => console.log('Settings') },
            { id: '2', label: 'Profile', onClick: () => console.log('Profile') },
        ],
    },
};
