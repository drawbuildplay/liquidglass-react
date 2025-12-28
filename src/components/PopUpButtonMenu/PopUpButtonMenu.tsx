import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface PopUpMenuItem {
    id: string;
    label: string;
    onClick: () => void;
    checked?: boolean;
    type?: 'item' | 'separator';
    variant?: 'default' | 'destructive';
}

export interface PopUpButtonMenuProps {
    trigger: React.ReactNode;
    items: PopUpMenuItem[];
    align?: 'left' | 'right';
}

export const PopUpButtonMenu: React.FC<PopUpButtonMenuProps> = ({
    trigger,
    items,
    align = 'left'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleItemClick = (item: PopUpMenuItem) => {
        if (item.type === 'separator') return;
        item.onClick();
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Trigger Wrapper */}
            <div
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', display: 'inline-flex' }}
            >
                {trigger}
            </div>

            {/* Menu Dropdown */}
            {isOpen && (
                <div
                    ref={menuRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        [align === 'right' ? 'right' : 'left']: 0,
                        marginTop: '8px',
                        minWidth: '220px',
                        zIndex: 1000,
                        background: 'rgba(245, 245, 250, 0.65)', // High transparency for glass feel
                        backdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '16px',
                        fontFamily: 'var(--lg-font-family)',
                        boxShadow: `
                            0 25px 60px rgba(0,0,0,0.3),
                            inset 0 1px 2px rgba(255, 255, 255, 0.7),
                            inset 0 -1px 1px rgba(0, 0, 0, 0.05)
                        `,
                        padding: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        transformOrigin: 'top center',
                        animation: 'liquid-menu-swoosh 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    {items.map((item, index) => {
                        if (item.type === 'separator') {
                            return (
                                <div
                                    key={`sep-${index}`}
                                    style={{
                                        height: '1px',
                                        background: 'rgba(0,0,0,0.08)',
                                        margin: '4px 10px',
                                    }}
                                />
                            );
                        }

                        const isDestructive = item.variant === 'destructive';

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className="liquid-menu-item"
                                style={{
                                    all: 'unset',
                                    padding: '10px 12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    color: isDestructive ? '#FF3B30' : '#000000',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s',
                                    userSelect: 'none',
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color: '#007AFF',
                                    opacity: item.checked ? 1 : 0
                                }}>
                                    {item.checked && <FontAwesomeIcon icon={faCheck} size="sm" />}
                                </div>
                                <span style={{ flex: 1 }}>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
            {/* @ts-ignore */}
            <style jsx>{`
                @keyframes liquid-menu-swoosh {
                    from { transform: scale(0.95) translateY(-5px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .liquid-menu-item:hover {
                    background: rgba(0,0,0,0.06) !important;
                }
                .liquid-menu-item:active {
                    background: rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </div>
    );
};
