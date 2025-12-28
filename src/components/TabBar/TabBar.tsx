import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface TabBarProps {
    items: TabItem[];
    activeTabId?: string;
    onTabChange?: (id: string) => void;
    showSearch?: boolean;
    onSearch?: (query: string) => void;
    style?: React.CSSProperties;
    className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
    items,
    activeTabId,
    onTabChange,
    showSearch = false,
    onSearch,
    style,
    className,
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearchToggle = () => {
        if (isSearchOpen) {
            onSearch?.(''); // Clear search on close if desired
        }
        setIsSearchOpen(!isSearchOpen);
    };

    // Calculate padding for tabs layout
    const activeIndex = items.findIndex((item) => item.id === activeTabId);
    const isFirstActive = activeIndex === 0;
    const isLastActive = activeIndex === items.length - 1;

    // Dynamic padding: 
    // If first is active -> tight left (4.5px), loose right (12px)
    // If last is active -> loose left (12px), tight right (4.5px)
    // Else (middle/none) -> loose both sides (12px)
    const paddingLeft = isFirstActive && !isSearchOpen ? '4.5px' : '12px';
    const paddingRight = isLastActive && !isSearchOpen ? '4.5px' : '12px';

    // Calculate natural width based on items
    // Active (90) + Inactive (50 each) + Gap (~32px each) + Padding (16.5)
    // We add some buffer to ensure it feels spacious but not stretched
    const gapSize = 32;
    const inactiveWidth = 50;
    const activeWidth = 90;
    const paddingTotal = 16.5; // 12 + 4.5

    // Total content width calculation
    const contentWidth = activeWidth + ((items.length - 1) * inactiveWidth) + ((items.length - 1) * gapSize) + paddingTotal;

    // Ensure search mode has enough width (e.g. at least 300px)
    const preferredWidth = isSearchOpen ? Math.max(contentWidth, 320) : contentWidth;

    const defaultContainerStyle: React.CSSProperties = {
        width: '100%',
        boxSizing: 'border-box',
    };

    const glassStyle: React.CSSProperties = {
        background: 'rgba(245, 245, 250, 0.26)',
        backdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
        WebkitBackdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
        borderRadius: '32.5px', // Half of 65px for pill shape
        margin: '0 5px 5px 5px',
        height: '65px',
        width: `min(100% - 10px, ${preferredWidth}px)`, // Responsive width
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: `
      0 14px 52px rgba(0, 0, 0, 0.12),
      inset 0 1px 2px rgba(255, 255, 255, 0.60),
      inset 0 -1px 1px rgba(0, 0, 0, 0.05)
    `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Removed flex: 1 to prevent unwanted stretching on desktop
        // Width property above will now control the size
    };

    const searchButtonStyle: React.CSSProperties = {
        width: '65px',
        height: '65px',
        borderRadius: '50%',
        background: glassStyle.background,
        backdropFilter: glassStyle.backdropFilter,
        WebkitBackdropFilter: glassStyle.WebkitBackdropFilter,
        border: glassStyle.border,
        boxShadow: glassStyle.boxShadow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginLeft: '10px', // Gap between pill and button
        flexShrink: 0,
        margin: '0 5px 5px 0', // Align bottom margin with pill
    };

    return (
        <div
            style={{
                ...defaultContainerStyle,
                ...style,
                display: 'flex',
                alignItems: 'flex-end', // Align items to bottom if heights differ, though both are 65px
                justifyContent: 'center', // Center the entire group (pill + button)
                paddingBottom: '0',
            }}
            className={className}
        >
            <div style={glassStyle}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: isSearchOpen ? '0 20px' : `0 ${paddingRight} 0 ${paddingLeft}`,
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'padding 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    {isSearchOpen ? (
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', color: '#f7f7f7' }}>
                            <FontAwesomeIcon icon={faSearch} style={{ fontSize: '18px', color: '#f7f7f7', marginRight: '10px' }} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search"
                                onChange={(e) => onSearch?.(e.target.value)}
                                className="liquid-tab-search-input"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '17px',
                                    fontWeight: 500, // Matches TabBar items
                                    color: '#f7f7f7',
                                    flex: 1,
                                    height: '100%',
                                    margin: 0,
                                    padding: 0,
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', // Explicitly system font
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            {items.map((item) => {
                                const isActive = activeTabId === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => onTabChange?.(item.id)}
                                        className={`liquid-tab-item ${isActive ? 'active' : ''}`}
                                        style={{
                                            color: isActive ? '#007aff' : '#000000', // Active blue, Inactive black
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '4px',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            lineHeight: 1,
                                            padding: '0',
                                            width: isActive ? '90px' : '50px', // Active expands significantly to fill space/nest, inactive shrinks
                                            height: '56px', // Increased height to fill more of the 65px container
                                            // Active state styling
                                            background: isActive ? '#FFFFFF' : 'transparent',
                                            borderRadius: '32.5px', // Matches container radius for concentric look
                                            boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',

                                            border: 'none',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            WebkitTapHighlightColor: 'transparent',
                                            userSelect: 'none',
                                            WebkitUserSelect: 'none',
                                            touchAction: 'manipulation',
                                            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)', // Springy effect
                                        }}
                                    >
                                        {item.icon && (
                                            <div
                                                style={{
                                                    fontSize: '24px',
                                                    height: '24px',
                                                    width: '24px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    opacity: 1, // Icon opacity usually handled by color, removing manual opacity transition for simplicity unless requested
                                                }}
                                            >
                                                {item.icon}
                                            </div>
                                        )}
                                        <span style={{ marginTop: '2px' }}>
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {showSearch && (
                <button
                    style={searchButtonStyle}
                    onClick={handleSearchToggle}
                    className="liquid-tab-search"
                >
                    <FontAwesomeIcon
                        icon={isSearchOpen ? faTimes : faSearch}
                        style={{ fontSize: '24px', color: '#000000' }}
                    />
                </button>
            )}

            {/* @ts-ignore */}
            <style jsx>{`
                .liquid-tab-item:not(.active):hover {
                    color: #FFFFFF !important;
                }
                .liquid-tab-search:hover {
                     background: rgba(255, 255, 255, 0.4) !important;
                }
                .liquid-tab-search-input::placeholder {
                    color: #f7f7f7;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};