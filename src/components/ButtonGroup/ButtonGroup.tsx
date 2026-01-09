import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  PopUpButtonMenu,
  type PopUpMenuItem,
} from "../PopUpButtonMenu/PopUpButtonMenu";

export interface ButtonGroupItem {
  id: string;
  icon: IconProp;
  onClick: () => void;
  disabled?: boolean;
  label?: string; // For aria-label or tooltip
  active?: boolean;
  color?: string; // Optional override for icon color
  className?: string;
}

export interface ButtonGroupProps {
  items: ButtonGroupItem[];
  variant?: "primary" | "secondary" | "danger" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  flat?: boolean;
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  variant = "primary",
  size = "md",
  flat = false,
  className = "",
  style = {},
  fullWidth = false,
}) => {
  // Responsive Logic: Deterministic Limits
  // Mobile (<768px): Max 4 slots (if >4 items, show 3 + ellipsis)
  // Desktop (>=768px): Max 6 slots (if >6 items, show 5 + ellipsis)

  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    // Initial check
    setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // If no items, render nothing
  if (!items || items.length === 0) {
    return null;
  }

  // Only 1 item? Render as a circle (icon-only button shape)
  // >1 item? Render as a pill with padding
  const isSingleItem = items.length === 1;

  // 1. STYLES (Copied from Button.tsx for parity)
  type VariantStyle = {
    bg: string;
    text: string;
    border: string;
    shadowColor: string;
  };

  const glassVariantStyles: Record<
    NonNullable<ButtonGroupProps["variant"]>,
    VariantStyle
  > = {
    primary: {
      bg: "rgba(0, 122, 255, 0.32)",
      text: "#ffffff",
      border: "rgba(255,255,255,0.28)",
      shadowColor: "rgba(0, 78, 204, 0.35)",
    },
    secondary: {
      bg: "rgba(120, 120, 128, 0.24)",
      text: "#000000",
      border: "rgba(255,255,255,0.20)",
      shadowColor: "rgba(0,0,0,0.18)",
    },
    danger: {
      bg: "rgba(255, 59, 48, 0.32)",
      text: "#ffffff",
      border: "rgba(255,255,255,0.28)",
      shadowColor: "rgba(204, 47, 38, 0.35)",
    },
    ghost: {
      bg: "rgba(255, 255, 255, 0.10)",
      text: "#007aff",
      border: "rgba(255,255,255,0.18)",
      shadowColor: "rgba(0,0,0,0.12)",
    },
    glass: {
      bg: "rgba(255, 255, 255, 0.15)",
      text: "#000000",
      border: "rgba(255,255,255,0.25)",
      shadowColor: "rgba(0,0,0,0.15)",
    },
  };

  const flatVariantStyles = {
    primary: { bg: "#007AFF", text: "#ffffff" },
    secondary: { bg: "#E5E5EA", text: "#000000" },
    danger: { bg: "#FF3B30", text: "#ffffff" },
    ghost: { bg: "transparent", text: "#007aff" },
    glass: { bg: "transparent", text: "#333333" },
  };

  const sizeStyles = {
    sm: {
      height: "36px",
      minWidth: isSingleItem ? "36px" : "auto",
      padding: isSingleItem ? "0" : "0 14px",
      iconSize: "14px",
      gap: "12px",
    },
    md: {
      height: "52px",
      minWidth: isSingleItem ? "52px" : "auto",
      padding: isSingleItem ? "0" : "0 22px", // Standard button uses 22px padding for labels
      iconSize: "21px", // Matching Button.tsx icon-only size
      gap: "24px", // Spacing between icons
    },
    lg: {
      height: "60px",
      minWidth: isSingleItem ? "60px" : "auto",
      padding: isSingleItem ? "0" : "0 28px",
      iconSize: "24px",
      gap: "28px",
    },
  };

  // Derived Styles
  const vStyle = flat
    ? flatVariantStyles[variant]
    : glassVariantStyles[variant];
  const sStyle = sizeStyles[size];

  // Calculate visible items based on deterministic limits
  const maxSlots = isDesktop ? 6 : 4;

  let visibleItems: ButtonGroupItem[] = [];
  let overflowItems: ButtonGroupItem[] = [];

  if (items.length > maxSlots) {
    // If we have more items than slots, we need to reserve one slot for the ellipsis
    // So visible items = maxSlots - 1
    const visibleCount = maxSlots - 1;

    // REVERSE PRIORITY:
    // We want the LAST items (end of list) to match the visible slots.
    // We want the FIRST items (start of list) to go into overflow.

    // items: [0, 1, 2, 3, 4, 5]
    // maxSlots: 4. visibleCount: 3.
    // desired visible: [3, 4, 5] (last 3)
    // desired overflow: [0, 1, 2] (first 3)

    visibleItems = items.slice(items.length - visibleCount);
    overflowItems = items.slice(0, items.length - visibleCount);
  } else {
    // Items fit in slots. No overflow.
    visibleItems = items;
    overflowItems = [];
  }

  const renderItem = (item: ButtonGroupItem) => {
    const isActive = item.active || false;
    const isDisabled = item.disabled || false;
    const iconColor = item.color || "currentColor";

    return (
      <button
        key={item.id}
        className={item.className}
        onClick={() => {
          if (!isDisabled) item.onClick();
        }}
        disabled={isDisabled}
        aria-label={item.label}
        title={item.label}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isActive ? "#007aff" : iconColor,
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.4 : isActive ? 1 : 0.85,
          transition:
            "transform 0.1s ease, color 0.2s ease, opacity 0.2s ease",
          outline: "none",
          zIndex: 1,
        }}
        onMouseDown={(e) => {
          if (!isDisabled) e.currentTarget.style.transform = "scale(0.92)";
        }}
        onMouseUp={(e) => {
          if (!isDisabled) e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <FontAwesomeIcon
          icon={item.icon}
          style={{
            fontSize: sStyle.iconSize,
            filter: isActive
              ? "drop-shadow(0 0 8px rgba(0,122,255,0.5))"
              : "none",
          }}
        />
      </button>
    );
  };

  const renderContent = () => {
    if (overflowItems.length === 0) {
      return items.map(renderItem);
    }

    // Render overflow button + visible items
    return (
      <>
        {/* Overflow Menu */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PopUpButtonMenu
            trigger={
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "currentColor",
                  cursor: "pointer",
                  opacity: 0.85,
                  fontSize: sStyle.iconSize,
                }}
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            }
            items={overflowItems.map((item) => ({
              id: item.id,
              label: item.label || "Action",
              icon: item.icon,
              onClick: item.onClick,
              checked: item.active,
              color: item.color,
            }))}
            align="center"
          />
        </div>

        {/* Visible Items */}
        {visibleItems.map(renderItem)}
      </>
    );
  };

  return (
    <div
      className={`liquid-glass-button-group ${className}`}
      style={{
        // Container Layout
        display: fullWidth ? "flex" : "inline-flex",
        // maxWidth: "100%", // Disabled responsive
        // width: "100%", // Disabled responsive
        justifyContent: "center",
        alignItems: "center",
        gap: sStyle.gap,

        // Sizing
        height: sStyle.height,
        minWidth: sStyle.minWidth,
        padding: sStyle.padding,
        margin: "4px",

        // Visuals (Shared with Button)
        background: vStyle.bg,
        color: vStyle.text,
        backdropFilter: flat
          ? "none"
          : "blur(20px) saturate(180%) contrast(105%)",
        WebkitBackdropFilter: flat
          ? "none"
          : "blur(20px) saturate(180%) contrast(105%)",
        border: flat
          ? "none"
          : `1px solid ${glassVariantStyles[variant].border}`,
        boxShadow: flat
          ? "none"
          : `
                  0 8px 32px ${glassVariantStyles[variant].shadowColor},
                  inset 0 1px 1px rgba(255,255,255,0.45),
                  inset 0 -1px 1px rgba(0,0,0,0.12)
                `,
        borderRadius: "26px", // Matches Button.tsx

        position: "relative",
        overflow: "hidden",
        transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",

        ...style,
      }}
    >
      {/* Inner Shine (Shared) */}
      {!flat && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
            pointerEvents: "none",
            opacity: 0.75,
          }}
        />
      )}

      {renderContent()}
    </div>
  );
};
