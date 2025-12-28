import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'search';
}

export const Input: React.FC<InputProps> = ({ variant = 'default', style, ...props }) => {
    const isSearch = variant === 'search';

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        ...style,
    };

    const inputStyle: React.CSSProperties = {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        width: '100%',
        padding: '8px 12px',
        paddingLeft: isSearch ? '36px' : '12px',
        fontSize: '15px',
        color: 'inherit',
        fontFamily: 'inherit',
    };

    return (
        <div style={containerStyle}>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.05)', // Subtle background for input fields
                borderRadius: '10px',
                // Inputs generally don't utilize strong blur in iOS but we can keep a subtle one
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}>
                {isSearch && (
                    <div style={{ position: 'absolute', left: '10px', color: '#8e8e93', pointerEvents: 'none' }}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                )}
                <input {...props} style={inputStyle} />
            </div>
        </div>
    );
};
