import type { Meta, StoryObj } from '@storybook/react';
import { SwipeableRow } from './SwipeableRow';
import { faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlassPanel } from '../GlassPanel/GlassPanel';

const meta: Meta<typeof SwipeableRow> = {
    title: 'Components/SwipeableRow',
    component: SwipeableRow,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwipeableRow>;

export const Default: Story = {
    render: (args) => (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <SwipeableRow {...args}>
                <GlassPanel style={{ padding: '16px' }}>
                    Swipe me left or right!
                </GlassPanel>
            </SwipeableRow>
            <div style={{ height: '16px' }} />
            <SwipeableRow {...args}>
                <GlassPanel style={{ padding: '16px' }}>
                    Delete (Left) or Like (Right)
                </GlassPanel>
            </SwipeableRow>
        </div>
    ),
    args: {
        leftActionIcon: <FontAwesomeIcon icon={faTrash} style={{ color: 'white' }} />,
        rightActionIcon: <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />,
        onSwipeLeft: () => console.log('Swiped Left (Delete)'),
        onSwipeRight: () => console.log('Swiped Right (Like)'),
    },
};
