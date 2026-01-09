// ... imports
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

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

  const desktopStyles: React.CSSProperties = {
    top: "50%",
    left: "50%",
    bottom: "auto",
    right: "auto",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "auto",
    aspectRatio: "3/4",
    borderRadius: "20px",
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const mobileStyles: React.CSSProperties = {
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    width: "100%",
  };

  const isDark = variant === "dark";

  // Define Glass Styles
  const glassStyles: React.CSSProperties = isDark
    ? {
      backgroundColor: "rgba(20, 20, 20, 0.85)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "white",
    }
    : {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      backdropFilter: "blur(20px) saturate(100%) contrast(100%)",
      WebkitBackdropFilter: "blur(20px) saturate(190%) contrast(115%)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      color: "inherit",
    };

  return ReactDOM.createPortal(
    <div
      style={{
        position: position,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3000,
      }}
    >
      <style>{`
                @keyframes lg-sheet-slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                @keyframes lg-sheet-fade-in {
                    from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                @keyframes lg-backdrop-fade {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: isDesktop ? "rgba(0,0,0,0.6)" : "transparent",
          animation:
            "lg-backdrop-fade 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards",
          touchAction: "none",
        }}
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
        style={{
          position: "absolute",
          overflow: "hidden",
          boxShadow: `
                    0 8px 32px 0 rgba(0, 0, 0, 0.3),
                    inset 0 1px 1px rgba(255, 255, 255, 0.4)
                `,
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--lg-font-family)",

          // Apply dynamic glass styles
          ...glassStyles,

          // Merge styles
          ...(isDesktop ? desktopStyles : mobileStyles),

          // Custom overrides
          ...style,

          // Animation
          animation: isDesktop
            ? "lg-sheet-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            : "lg-sheet-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "0",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
