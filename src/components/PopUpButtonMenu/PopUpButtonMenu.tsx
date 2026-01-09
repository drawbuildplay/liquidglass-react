import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface PopUpMenuItem {
  id: string;
  label: string;
  icon?: IconProp;
  onClick: () => void;
  checked?: boolean;
  type?: "item" | "separator";
  variant?: "default" | "destructive";
  color?: string; // Custom color override
}

export interface PopUpButtonMenuProps {
  trigger: React.ReactNode;
  items: PopUpMenuItem[];
  align?: "left" | "right" | "center";
  matchMenuWidth?: boolean;
}

export const PopUpButtonMenu: React.FC<PopUpButtonMenuProps> = ({
  trigger,
  items,
  align = "left",
  matchMenuWidth = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is inside menu (portal)
      if (
        menuRef.current &&
        menuRef.current.contains(event.target as Node)
      ) {
        return;
      }

      // Check if click is inside trigger
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Only close on window resize, not scroll (allows menu scrolling)
      // Or if we really want to close on PAGE scroll, we need to distinguish.
      // For now, removing scroll listener is the safest UX fix for inner scrolling.
      // window.addEventListener("scroll", () => setIsOpen(false), true);
      window.addEventListener("resize", () => setIsOpen(false));
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // window.removeEventListener("scroll", () => setIsOpen(false), true);
      window.removeEventListener("resize", () => setIsOpen(false));
    };
  }, [isOpen]);

  // Calculate position when opening
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const viewportWidth = document.documentElement.clientWidth;

      const style: React.CSSProperties = {
        position: "absolute",
        top: rect.bottom + scrollY + 8, // 8px margin
        zIndex: 9999, // High z-index for portal
      };

      // Base width logic
      let menuWidth = 220; // default min-width
      if (matchMenuWidth) {
        style.width = rect.width;
        menuWidth = rect.width;
      } else {
        style.minWidth = "220px";
      }

      // Horizontal Positioning Logic
      if (align === "center") {
        // Center: trigger center - half menu width
        let leftPos = rect.left + rect.width / 2 - menuWidth / 2 + scrollX;

        // Boundary Clamp
        if (leftPos < 10) {
          leftPos = 10;
        }
        // Check right overflow
        // If leftPos + menuWidth > viewportWidth - 10
        if (leftPos + menuWidth > viewportWidth - 10) {
          leftPos = viewportWidth - menuWidth - 10;
        }
        // Double check left again (in case screen is narrower than menuWidth + 20)
        if (leftPos < 10) {
          leftPos = 10;
        }

        style.left = leftPos;
        style.right = "auto";
      } else if (align === "right") {
        // Try aligning right edge to trigger right edge
        const rightPos = document.body.clientWidth - (rect.right + scrollX);

        // Check if this pushes the left edge offscreen?
        // Estimated Left Edge = rect.right - menuWidth
        // If (rect.right - menuWidth) < 10, we are clipping on the left.
        // Or if we use the rightPos:
        // windowWidth - rightPos - menuWidth < 10

        const estimatedLeft = rect.right - menuWidth;

        if (estimatedLeft < 10) {
          // It overflows on the left. Force it to safe left margin.
          style.left = 10;
          style.right = "auto";
        } else {
          style.right = rightPos;
          style.left = "auto";
        }
      } else {
        // Default: Align left edge to trigger left edge
        let leftPos = rect.left + scrollX;

        // Boundary Check: Does it overflow right side?
        if (leftPos + menuWidth > viewportWidth - 10) {
          // It overflows. Shift it left to fit.
          // New left = viewportWidth - menuWidth - 10 (padding)
          leftPos = viewportWidth - menuWidth - 10;
        }

        // Boundary Check: Does it overflow left side (e.g. if shifted too far)?
        if (leftPos < 10) {
          leftPos = 10;
        }

        style.left = leftPos;
        style.right = "auto";
      }

      setMenuStyle(style);
    }
  }, [isOpen, align, matchMenuWidth]);

  const handleItemClick = (item: PopUpMenuItem) => {
    if (item.type === "separator") return;
    item.onClick();
    setIsOpen(false);
  };

  const menuContent = (
    <div
      ref={menuRef}
      style={{
        ...menuStyle,
        textWrap: "nowrap",
        maxHeight: "50vh",
        overflowY: "auto",
        background: "rgba(245, 245, 250, 0.65)",
        backdropFilter: "blur(40px) saturate(190%) contrast(115%)",
        WebkitBackdropFilter: "blur(40px) saturate(190%) contrast(115%)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "30px",
        fontFamily: "var(--lg-font-family)",
        boxShadow: `
          0 25px 60px rgba(0,0,0,0.3),
          inset 0 1px 2px rgba(255, 255, 255, 0.7),
          inset 0 -1px 1px rgba(0, 0, 0, 0.05)
        `,
        padding: "6px",
        display: "flex",
        flexDirection: "column",
        transformOrigin: "top center",
        animation: "liquid-menu-swoosh 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.2)", // Bouncy "poof"
      }}
    >
      {items.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={`sep-${index}`}
              style={{
                height: "1px",
                background: "rgba(0,0,0,0.08)",
                margin: "4px 10px",
              }}
            />
          );
        }

        const isDestructive = item.variant === "destructive";
        const isChecked = item.checked;

        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`liquid-menu-item ${isChecked ? "active" : ""} ${isDestructive ? "destructive" : ""}`}
            style={{
              all: "unset",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "12px",
              fontSize: "16px",
              fontWeight: 600,
              color: isDestructive
                ? "#FF3B30"
                : item.color // Use custom color if provided
                  ? item.color
                  : isChecked
                    ? "#007AFF"
                    : "#000000",
              borderRadius: "30px",
              background: isChecked ? "#FFFFFF" : "transparent",
              boxShadow: isChecked ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              userSelect: "none",
              width: "100%",
              boxSizing: "border-box",
              textAlign: "left",
            }}
          >
            {item.icon && (
              <FontAwesomeIcon
                icon={item.icon}
                style={{ fontSize: "16px", width: "20px" }}
              />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: "pointer",
          display: "flex",
          width: "100%",
          minWidth: matchMenuWidth ? "220px" : "auto",
        }}
      >
        {trigger}
      </div>

      {isOpen && createPortal(menuContent, document.body)}

      {/* @ts-ignore */}
      <style jsx>{`
        @keyframes liquid-menu-swoosh {
          from {
            transform: scale(0.2) translateY(-15px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
