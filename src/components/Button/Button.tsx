import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ButtonProps {
    label?: string;
    onClick?: () => void;
    icon?: IconProp;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    fullWidth?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    icon,
    variant = 'primary',
    fullWidth = false,
    disabled = false,
}) => {
    const isIconOnly = !!icon && !label;

    // Variant-specific colors (iOS-inspired 2025 feel)
    const variantStyles = {
        primary: {
            bg: 'rgba(0, 122, 255, 0.32)',
            text: '#ffffff',
            border: 'rgba(255,255,255,0.28)',
            shadowColor: 'rgba(0, 78, 204, 0.35)',
        },
        secondary: {
            bg: 'rgba(120, 120, 128, 0.24)',
            text: '#000000',
            border: 'rgba(255,255,255,0.20)',
            shadowColor: 'rgba(0,0,0,0.18)',
        },
        danger: {
            bg: 'rgba(255, 59, 48, 0.32)',
            text: '#ffffff',
            border: 'rgba(255,255,255,0.28)',
            shadowColor: 'rgba(204, 47, 38, 0.35)',
        },
        ghost: {
            bg: 'rgba(255, 255, 255, 0.10)',
            text: '#007aff',
            border: 'rgba(255,255,255,0.18)',
            shadowColor: 'rgba(0,0,0,0.12)',
        },
    };

    const style = variantStyles[variant];

    return (
        <button
            className="liquid-glass-button"
            type="button"
            onClick={onClick}
            disabled={disabled}
            style={{
                // Layout & sizing
                display: fullWidth ? 'flex' : 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                minWidth: isIconOnly ? '52px' : '132px',
                height: isIconOnly ? '52px' : '52px',
                padding: isIconOnly ? '0' : '0 22px',
                margin: '4px',

                // Typography
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                fontFamily: 'var(--lg-font-family)',

                // Core glass effect
                background: style.bg,
                backdropFilter: 'blur(20px) saturate(180%) contrast(105%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%) contrast(105%)',
                borderRadius: '26px', // perfect pill shape
                border: `1px solid ${style.border}`,
                boxShadow: `
          0 8px 32px ${style.shadowColor},
          inset 0 1px 1px rgba(255,255,255,0.45),
          inset 0 -1px 1px rgba(0,0,0,0.12)
        `,

                color: style.text,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.48 : 1,
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle inner shine overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)',
                    pointerEvents: 'none',
                    opacity: disabled ? 0.4 : 0.75,
                    transition: 'opacity 0.4s ease',
                }}
            />

            {/* Content */}
            {icon && (
                <FontAwesomeIcon
                    icon={icon}
                    style={{ fontSize: isIconOnly ? '21px' : '17px' }}
                />
            )}
            {label && <span>{label}</span>}

            {/* Hover & active states – gives a nice "liquid push" feel */}

        </button>
    );
};