import React from 'react';
import { createPortal } from 'react-dom';

export interface OverlayProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};
