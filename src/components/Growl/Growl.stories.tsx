import type { Meta, StoryObj } from '@storybook/react';
import { Growl } from './Growl';
import { useState } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const meta = {
    title: 'Components/Growl',
    component: Growl,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Growl>;

export default meta;
type Story = StoryObj<typeof meta>;

const Wrapper = (args: any) => {
    const [visible, setVisible] = useState(true);
    return (
        <div style={{ height: '200px', display: 'flex', alignItems: 'center' }}>
            <button onClick={() => setVisible(true)}>Show Notification</button>
            <Growl {...args} visible={visible} onDismiss={() => setVisible(false)} />
        </div>
    );
};

export const Default: Story = {
    render: (args) => <Wrapper {...args} />,
    args: {
        message: 'Action completed successfully',
        icon: faCheckCircle,
        visible: true,
        duration: 3000,
    },
};
