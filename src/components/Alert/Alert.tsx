import React from 'react';

import { Overlay } from '../Overlay/Overlay';

export interface AlertAction {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'cancel' | 'destructive';
}

export interface AlertProps {
    isOpen: boolean;
    title: string;
    message?: string;
    actions: AlertAction[];
    onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ isOpen, title, message, actions, onClose }) => {
    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <div style={{
                width: '320px',
                maxWidth: '90vw',
                borderRadius: '32px',
                padding: '0',
                background: 'rgba(245, 245, 250, 0.65)', // High transparency for glass feel
                backdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
                WebkitBackdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: `
                    0 25px 60px rgba(0,0,0,0.3),
                    inset 0 1px 2px rgba(255, 255, 255, 0.7),
                    inset 0 -1px 1px rgba(0, 0, 0, 0.05)
                `,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                fontFamily: 'var(--lg-font-family)',
            }}>
                <div style={{ padding: '24px 24px 0 24px', textAlign: 'left' }}>
                    <h3 style={{
                        margin: '0',
                        fontSize: '19px',
                        fontWeight: 700,
                        color: '#000000',
                        lineHeight: '1.2'
                    }}>
                        {title}
                    </h3>
                    {message && (
                        <p style={{
                            margin: '8px 0 0 0',
                            fontSize: '15px',
                            lineHeight: '1.5',
                            color: '#666666'
                        }}>
                            {message}
                        </p>
                    )}
                </div>

                <div style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {actions.map((action, index) => {
                        const isDestructive = action.variant === 'destructive';
                        const isCancel = action.variant === 'cancel';
                        const isPrimary = !isDestructive && !isCancel;

                        // Determine styles based on variant
                        let bg = '#E5E5EA'; // Default gray for cancel
                        let color = '#000000';

                        if (isDestructive) {
                            bg = '#FF3B30';
                            color = '#FFFFFF';
                        } else if (isPrimary) {
                            bg = '#007AFF';
                            color = '#FFFFFF';
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => { action.onClick(); onClose?.(); }}
                                className="lg-button-reset"
                                style={{
                                    flex: 1,
                                    height: '50px',
                                    borderRadius: '25px', // Pill shape
                                    border: 'none',
                                    padding: '0 16px',
                                    fontSize: '17px',
                                    fontWeight: 600,
                                    color: color,
                                    background: bg,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                            >
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </Overlay >
    );
};
