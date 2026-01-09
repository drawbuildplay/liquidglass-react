import React from "react";
import "./List.css";

interface ListProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const List: React.FC<ListProps> = ({
    children,
    className = "",
    style,
}) => {
    return (
        <div className={`liquid-list ${className}`} style={style}>
            {children}
        </div>
    );
};

interface ListItemProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    title?: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({
    children,
    className = "",
    style,
    onClick,
    title,
    subtitle,
    rightElement,
}) => {
    return (
        <div
            className={`liquid-list-item ${className}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                cursor: onClick ? 'pointer' : 'default',
                ...style
            }}
            onClick={onClick}
        >
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {title && <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{title}</div>}
                {subtitle && <div style={{ fontSize: '13px', opacity: 0.6 }}>{subtitle}</div>}
                {children}
            </div>
            {rightElement && <div style={{ marginLeft: '12px' }}>{rightElement}</div>}
        </div>
    );
};

interface ListCardProps {
    left?: React.ReactNode;
    right?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
}

export const ListCard: React.FC<ListCardProps> = ({
    left,
    right,
    children,
    className = "",
    style,
    onClick,
}) => {
    return (
        <div
            className={`liquid-card ${className}`}
            style={style}
            onClick={onClick}
        >
            {left && <div className="liquid-card-left">{left}</div>}
            <div className="liquid-card-center">{children}</div>
            {right && <div className="liquid-card-right">{right}</div>}
        </div>
    );
};
