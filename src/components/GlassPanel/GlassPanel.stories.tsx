import type { Meta, StoryObj } from '@storybook/react';
import { GlassPanel } from './GlassPanel';
import { Button } from '../Button/Button';

const meta: Meta<typeof GlassPanel> = {
    title: 'Components/GlassPanel',
    component: GlassPanel,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
        }
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GlassPanel>;

export const Default: Story = {
    args: {
        children: <div style={{ padding: '20px', color: 'black' }}>
            <h3>Glass Panel</h3>
            <p>This is content inside a glass panel.</p>
            <Button label="Action" variant="primary" />
        </div>,
        style: { width: '300px', height: '200px' }
    },
};
