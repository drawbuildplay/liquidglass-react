import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Sheet.module.css";

export interface SheetProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  height?: string | number;
  position?: "fixed" | "absolute";
  forceMobile?: boolean;
  variant?: "light" | "dark";
  style?: React.CSSProperties;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  children,
  height = "90%",
  position = "fixed",
  forceMobile = false,
  variant = "light",
  style,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}) => {
  const [isDesktop, setIsDesktop] = useState(() => {
    // Initialize correctly to avoid flash/wrong animation on mount
    if (typeof window === "undefined") return false;
    return (
      !forceMobile &&
      window.matchMedia &&
      window.matchMedia("(min-width: 768px)").matches
    );
  });

  useEffect(() => {
    const checkDesktop = () =>
      setIsDesktop(
        !forceMobile &&
        window.matchMedia &&
        window.matchMedia("(min-width: 768px)").matches,
      );
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, [forceMobile]);

  if (!isOpen) return null;

  const isDark = variant === "dark";
  const variantClass = isDark ? styles.dark : styles.light;
  const layoutClass = isDesktop ? styles.desktop : styles.mobile;
  const backdropClass = isDesktop ? styles.desktop : styles.mobile;

  // For mobile, apply height dynamically if needed (passed prop)
  // But wait, module CSS .mobile has fixed/default behavior.
  // The original component applied `height: height` (prop) inline for mobile.
  // So we should pass inline style for height ONLY if mobile.

  const dynamicStyle: React.CSSProperties = isDesktop
    ? { ...style }
    : { height: height, ...style };

  const wrapperClass = position === "absolute" ? styles.absoluteWrapper : "";

  return ReactDOM.createPortal(
    <div className={`${styles.wrapper} ${wrapperClass}`}>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${backdropClass}`}
        data-testid="sheet-backdrop"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose?.();
          }
        }}
      />

      {/* Sheet */}
      <div
        className={`${styles.sheet} ${layoutClass} ${variantClass}`}
        style={dynamicStyle}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
