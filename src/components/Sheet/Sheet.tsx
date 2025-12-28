// ... imports
import React, { useState, useEffect } from 'react';

export interface SheetProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    height?: string | number;
    position?: 'fixed' | 'absolute';
    forceMobile?: boolean;
}

export const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, children, height = '90%', position = 'fixed', forceMobile = false }) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(!forceMobile && window.matchMedia('(min-width: 768px)').matches);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    if (!isOpen) return null;

    const desktopStyles: React.CSSProperties = {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        right: 'auto',
        transform: 'translate(-50%, -50%)',
        height: '80%', // 0.80vh equivalent in container context
        width: 'auto',
        aspectRatio: '3/4',
        borderRadius: '20px',
        maxWidth: '100%',
        maxHeight: '100%',
    };

    const mobileStyles: React.CSSProperties = {
        bottom: 0,
        left: 0,
        right: 0,
        height: height,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        width: '100%',
    };

    return (
        <div style={{ position: position, top: 0, left: 0, right: 0, bottom: 0, zIndex: 900 }}>
            {/* Backdrop */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={onClose} />

            {/* Sheet */}
            <div style={{
                position: 'absolute',
                overflow: 'hidden',
                boxShadow: `
                    0 -10px 40px rgba(0,0,0,0.15),
                    inset 0 1px 1px rgba(255, 255, 255, 0.6)
                `,
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(245, 245, 250, 0.65)',
                backdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
                WebkitBackdropFilter: 'blur(40px) saturate(190%) contrast(115%)',
                border: '1px solid rgba(255, 255, 255, 0.3)', // Full border for both
                fontFamily: 'var(--lg-font-family)',
                ...(isDesktop ? desktopStyles : mobileStyles),
            }}>
                {!isDesktop && (
                    <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
                        {/* Drag Handle */}
                        <div style={{ width: '36px', height: '5px', borderRadius: '3px', background: 'rgba(0,0,0,0.2)' }} />
                    </div>
                )}
                <div style={{ flex: 1, padding: '0', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};
