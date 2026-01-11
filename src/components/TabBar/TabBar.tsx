import React, { useState, useEffect } from "react";
import { Search } from "../Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./TabBar.module.css";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabBarProps {
  items: TabItem[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  style?: React.CSSProperties;
  className?: string;
  // Controlled search props
  isSearchOpen?: boolean;
  onSearchToggle?: (isOpen: boolean) => void;
  searchContent?: React.ReactNode;
}

export const TabBar: React.FC<TabBarProps> = ({
  items,
  activeTabId,
  onTabChange,
  showSearch = false,
  onSearch,
  style,
  className = "", // Default to empty string
  isSearchOpen: controlledIsSearchOpen,
  onSearchToggle,
  searchContent,
}) => {
  const [internalIsSearchOpen, setInternalIsSearchOpen] = useState(false);

  const isSearchOpen =
    controlledIsSearchOpen !== undefined
      ? controlledIsSearchOpen
      : internalIsSearchOpen;

  useEffect(() => {
    // Optional: Any other side effects on search open
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    const newState = !isSearchOpen;
    if (isSearchOpen) {
      onSearch?.(""); // Clear search on close if desired
    }

    if (onSearchToggle) {
      onSearchToggle(newState);
    } else {
      setInternalIsSearchOpen(newState);
    }
  };

  // Calculate padding for tabs layout
  const activeIndex = items.findIndex((item) => item.id === activeTabId);
  const isFirstActive = activeIndex === 0;
  const isLastActive = activeIndex === items.length - 1;

  const paddingLeft = isFirstActive && !isSearchOpen ? "4.5px" : "12px";
  const paddingRight = isLastActive && !isSearchOpen ? "4.5px" : "12px";

  const gapSize = 32;
  const inactiveWidth = 50;
  const activeWidth = 90;
  const paddingTotal = 16.5;

  const contentWidth =
    activeWidth +
    (items.length - 1) * inactiveWidth +
    (items.length - 1) * gapSize +
    paddingTotal;

  const preferredWidth = isSearchOpen
    ? Math.max(contentWidth, 320)
    : contentWidth;

  return (
    <div
      style={style}
      className={`${styles.container} ${className}`}
    >
      <div
        className={styles.pill}
        style={{
          width: `min(100% - 10px - ${showSearch ? 80 : 0}px, ${preferredWidth}px)`
        }}
      >
        <div
          className={styles.pillContent}
          style={{
            padding: isSearchOpen
              ? "0 20px"
              : `0 ${paddingRight} 0 ${paddingLeft}`,
          }}
        >
          {isSearchOpen ? (
            <div className={styles.searchContainer}>
              {searchContent ? (
                searchContent
              ) : (
                <>
                  <Search
                    variant="transparent"
                    placeholder="Search"
                    onChange={(val) => onSearch?.(val)}
                    onSearch={(val) => onSearch?.(val)}
                    autoFocus={true}
                    className={styles.searchInput}
                    type="search"
                    inputMode="search"
                    enterKeyHint="search"
                  />
                </>
              )}
            </div>
          ) : (
            <div className={styles.tabList}>
              {items.map((item) => {
                const isActive = activeTabId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onTabChange?.(item.id);
                    }}
                    className={`${styles.tabItem} ${isActive ? styles.active : ""}`}
                  >
                    {item.icon && (
                      <div className={styles.icon}>
                        {item.icon}
                      </div>
                    )}
                    <span className={styles.label}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showSearch && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSearchToggle();
          }}
          className={styles.searchButton}
          aria-label="Toggle Search"
        >
          <FontAwesomeIcon
            icon={isSearchOpen ? faTimes : faSearch}
            style={{ fontSize: "24px", color: "#000000" }}
          />
        </button>
      )}
    </div>
  );
};
