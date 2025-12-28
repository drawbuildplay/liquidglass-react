import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from './Toolbar';
import { Button } from '../Button/Button';
import { faArrowLeft, faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const meta = {
    title: 'Components/Toolbar',
    component: Toolbar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Page Title',
        children: <Button icon={faArrowLeft} variant="secondary" label="Back" />,
        rightElement: <Button icon={faPlus} variant="primary" />,
    },
};

export const GroupedButtons: Story = {
    args: {
        title: 'Edit Item',
        children: <Button label="Cancel" variant="ghost" />,
        rightElement: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button icon={faEllipsisH} variant="secondary" />
                <Button label="Done" variant="primary" />
            </div>
        ),
    },
};
