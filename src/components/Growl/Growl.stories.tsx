import type { Meta, StoryObj } from '@storybook/react';
import { Growl } from './Growl';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Growl> = {
    title: 'Components/Growl',
    component: Growl,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Growl>;

export const Default: Story = {
    render: (args) => {
        const [visible, setVisible] = useState(false);
        return (
            <div>
                <Button label="Show Growl" onClick={() => setVisible(true)} />
                <Growl {...args} visible={visible} onDismiss={() => setVisible(false)} />
            </div>
        );
    },
    args: {
        message: 'Operation successful',
        icon: faCheckCircle,
        duration: 3000,
    },
};

export const Info: Story = {
    render: (args) => {
        const [visible, setVisible] = useState(false);
        return (
            <div>
                <Button label="Show Info" onClick={() => setVisible(true)} />
                <Growl {...args} visible={visible} onDismiss={() => setVisible(false)} />
            </div>
        );
    },
    args: {
        message: 'New update available',
        icon: faInfoCircle,
        duration: 5000,
    },
};
