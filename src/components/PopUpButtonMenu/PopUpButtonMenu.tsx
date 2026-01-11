import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./PopUpButtonMenu.module.css";

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
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
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
    <div ref={menuRef} className={styles.menu} style={menuStyle}>
      {items.map((item, index) => {
        if (item.type === "separator") {
          return <div key={`sep-${index}`} className={styles.separator} />;
        }

        const isDestructive = item.variant === "destructive";
        const isChecked = item.checked;
        const customColor = item.color;

        let itemClass = styles.item;
        if (isDestructive) itemClass += ` ${styles.destructive}`;
        if (isChecked) itemClass += ` ${styles.active}`;

        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={itemClass}
            style={{
              color: !isDestructive && customColor ? customColor : undefined,
            }}
          >
            {item.icon && (
              <FontAwesomeIcon icon={item.icon} className={styles.itemIcon} />
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
        className={`${styles.triggerWrapper} ${matchMenuWidth ? styles.matchWidth : styles.autoWidth}`}
      >
        {trigger}
      </div>

      {isOpen && createPortal(menuContent, document.body)}
    </>
  );
};
