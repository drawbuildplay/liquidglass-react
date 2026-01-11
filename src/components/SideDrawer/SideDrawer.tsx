import React from "react";
import { GlassPanel } from "../GlassPanel/GlassPanel";
import { faChevronLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import styles from "./SideDrawer.module.css";

interface SideDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
  position?: "left" | "right" | "top";
  hideToggle?: boolean;
  floating?: boolean;
  backgroundImage?: string;
  style?: React.CSSProperties;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onToggle,
  children,
  className = "",
  position = "left",
  hideToggle = false,
  floating = true,
  style,
  backgroundImage,
}) => {
  // Construct styles for the glass panel if background image is provided
  const glassStyle: React.CSSProperties = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

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
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={onToggle}
      />

      {/* Sliding Panel */}
      <div
        className={`${styles.container} ${position} ${isOpen ? styles.open : styles.collapsed} ${!floating ? styles.inline : ""} ${className}`}
        style={style}
      >
        <div className={styles.content}>
          <GlassPanel className={styles.glass} style={glassStyle}>
            <div
              className={`${styles.inner} ${isOpen ? styles.visible : styles.hidden}`}
            >
              {children}
            </div>
          </GlassPanel>
        </div>
      </div>
    </>
  );
};
