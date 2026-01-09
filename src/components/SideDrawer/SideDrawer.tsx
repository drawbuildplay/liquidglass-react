import React from "react";
import { GlassPanel } from "../GlassPanel/GlassPanel";
import {
    faChevronLeft,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import "./SideDrawer.css";

interface SideDrawerProps {
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    className?: string;
    position?: "left" | "right" | "top";
    hideToggle?: boolean;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
    isOpen,
    onToggle,
    children,
    className = "",
    position = "left",
    hideToggle = false,
}) => {
    return (
        <>
            {/* Toggle Button - Lives outside the sliding container so it doesn't move with transform */}
            {!hideToggle && (
                <div className="drawer-fixed-toggle">
                    <Button
                        className="drawer-toggle-btn"
                        onClick={onToggle}
                        icon={isOpen ? faChevronLeft : faBars} // Use Bars when collapsed? Or ChevronRight? User asked for collapse/expand.
                        // Re-reading: "When open... button... to collapse. When collapsed... visible... to expand"
                        // Let's stick to chevron for now, or maybe Bars is better for "Open Menu".
                        // Since it's a profile, maybe just ChevronRight when collapsed (pointing to content) and Left (pointing back) when open.
                        // Or "Close" (X) / "Menu" (Bars).
                        // Existing was Left/Right. Let's keep it.
                        // Actually, if it's top-left, Left closes (goes back), Right opens (standard logic).
                        variant="glass"
                        aria-label={isOpen ? "Collapse profile" : "Expand profile"}
                    />
                </div>
            )}



            {/* Backdrop for clicking outside to close */}
            <div
                className={`side-drawer-backdrop ${isOpen ? 'open' : ''}`}
                onClick={onToggle}
            />

            {/* Sliding Panel */}
            <div
                className={`side-drawer-container ${position} ${isOpen ? "open" : "collapsed"} ${className}`}
            >
                <div className="side-drawer-content">
                    <GlassPanel className="side-drawer-glass">
                        <div className={`drawer-inner ${isOpen ? "visible" : "hidden"}`}>
                            {children}
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </>
    );
};
