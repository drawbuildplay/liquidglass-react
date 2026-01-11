import React from "react";
import { GlassPanel } from "../GlassPanel/GlassPanel";
import {
    faChevronLeft,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import styles from "./SideDrawer.module.css";

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
                <div className={styles.fixedToggle}>
                    <Button
                        className={styles.toggleBtn}
                        onClick={onToggle}
                        icon={isOpen ? faChevronLeft : faBars}
                        variant="glass"
                        aria-label={isOpen ? "Collapse profile" : "Expand profile"}
                    />
                </div>
            )}

            {/* Backdrop for clicking outside to close */}
            <div
                className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
                onClick={onToggle}
            />

            {/* Sliding Panel */}
            <div
                className={`${styles.container} ${position} ${isOpen ? styles.open : styles.collapsed} ${className}`}
            >
                <div className={styles.content}>
                    <GlassPanel className={styles.glass}>
                        <div className={`${styles.inner} ${isOpen ? styles.visible : styles.hidden}`}>
                            {children}
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </>
    );
};
