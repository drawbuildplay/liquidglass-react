import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  PopUpButtonMenu,
  type PopUpMenuItem,
} from "../PopUpButtonMenu/PopUpButtonMenu";
import styles from "./ButtonGroup.module.css";

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
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  const isSingleItem = items.length === 1;

  // Construct container class names
  const variantClass = styles[variant];
  const modeClass = flat ? styles.flatBase : styles.glassBase;
  const sizeClass = styles[size];
  const singleClass = isSingleItem ? styles.single : "";
  const fullWidthClass = fullWidth ? styles.fullWidth : "";

  const containerClassName = [
    styles.container,
    variantClass,
    modeClass,
    sizeClass,
    singleClass,
    fullWidthClass,
    className,
  ].filter(Boolean).join(" ");

  // Calculate visible items based on deterministic limits
  const maxSlots = isDesktop ? 6 : 4;
  let visibleItems: ButtonGroupItem[] = [];
  let overflowItems: ButtonGroupItem[] = [];

  if (items.length > maxSlots) {
    const visibleCount = maxSlots - 1;
    visibleItems = items.slice(items.length - visibleCount);
    overflowItems = items.slice(0, items.length - visibleCount);
  } else {
    visibleItems = items;
    overflowItems = [];
  }

  // Determine icon size for inline styles if needed, or mapped.
  // We can map size to pixel values if we need to pass them to FontAwesome, 
  // OR we can set font-size on the button class?
  // Original code: sm: 14px, md: 21px, lg: 24px.
  // I will just use inline style for font-size on the icon for simplicity and precision mapping
  const iconSizes = { sm: "14px", md: "21px", lg: "24px" };
  const iconSize = iconSizes[size];

  const renderItem = (item: ButtonGroupItem) => {
    const isActive = item.active || false;
    const isDisabled = item.disabled || false;
    const iconColor = item.color || "currentColor";

    return (
      <button
        key={item.id}
        className={`${styles.button} ${isActive ? styles.active : ""} ${item.className || ""}`}
        onClick={() => {
          if (!isDisabled) item.onClick();
        }}
        disabled={isDisabled}
        aria-label={item.label}
        title={item.label}
        style={{
          color: isActive ? "#007aff" : iconColor, // Override active color if item.color is provided? Original preferred #007aff for active.
        }}
      >
        <FontAwesomeIcon
          icon={item.icon}
          style={{
            fontSize: iconSize,
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

    return (
      <>
        {/* Overflow Menu */}
        <div className={styles.overflowContainer}>
          <PopUpButtonMenu
            trigger={
              <button
                className={styles.overflowButton}
                style={{ fontSize: iconSize }}
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
      className={containerClassName}
      style={style}
    >
      {/* Inner Shine (Shared) */}
      {!flat && (
        <div className={styles.shine} />
      )}

      {renderContent()}
    </div>
  );
};
