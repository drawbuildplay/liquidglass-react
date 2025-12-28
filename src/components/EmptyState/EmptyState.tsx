import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface EmptyStateProps {
    icon?: IconProp;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            color: '#8e8e93',
            height: '100%',
        }}>
            {icon && <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>
                <FontAwesomeIcon icon={icon} />
            </div>}
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600, color: '#1d1d1f' }}>{title}</h3>
            {description && <p style={{ margin: '0 0 24px 0', fontSize: '14px', maxWidth: '300px' }}>{description}</p>}
            {action}
        </div>
    );
};
