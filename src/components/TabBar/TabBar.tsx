import React, { useState, useEffect } from "react";
import { Search } from "../Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

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
  className,
  isSearchOpen: controlledIsSearchOpen,
  onSearchToggle,
  searchContent,
}) => {
  const [internalIsSearchOpen, setInternalIsSearchOpen] = useState(false);

  const isSearchOpen =
    controlledIsSearchOpen !== undefined
      ? controlledIsSearchOpen
      : internalIsSearchOpen;
  // setIsSearchOpen usage in this component now relies on handleSearchToggle abstraction

  // We don't have a direct setIsSearchOpen setter if we are controlled, so we use logic below

  // Focus logic now handled by autoFocus in Search component
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

  // Dynamic padding:
  // If first is active -> tight left (4.5px), loose right (12px)
  // If last is active -> loose left (12px), tight right (4.5px)
  // Else (middle/none) -> loose both sides (12px)
  const paddingLeft = isFirstActive && !isSearchOpen ? "4.5px" : "12px";
  const paddingRight = isLastActive && !isSearchOpen ? "4.5px" : "12px";

  // Calculate natural width based on items
  // Active (90) + Inactive (50 each) + Gap (~32px each) + Padding (16.5)
  // We add some buffer to ensure it feels spacious but not stretched
  const gapSize = 32;
  const inactiveWidth = 50;
  const activeWidth = 90;
  const paddingTotal = 16.5; // 12 + 4.5

  // Total content width calculation
  const contentWidth =
    activeWidth +
    (items.length - 1) * inactiveWidth +
    (items.length - 1) * gapSize +
    paddingTotal;

  // Ensure search mode has enough width (e.g. at least 300px)
  const preferredWidth = isSearchOpen
    ? Math.max(contentWidth, 320)
    : contentWidth;

  const defaultContainerStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
  };

  const glassStyle: React.CSSProperties = {
    background: "rgba(245, 245, 250, 0.26)",
    backdropFilter: "blur(40px) saturate(190%) contrast(115%)",
    WebkitBackdropFilter: "blur(40px) saturate(190%) contrast(115%)",
    borderRadius: "32.5px", // Half of 65px for pill shape
    margin: "0 5px 25px 5px",
    height: "65px",
    width: `min(100% - 10px - ${showSearch ? 80 : 0}px, ${preferredWidth}px)`, // Responsive width accounting for search button
    overflow: "hidden",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: `
      0 14px 52px rgba(0, 0, 0, 0.12),
      inset 0 1px 2px rgba(255, 255, 255, 0.60),
      inset 0 -1px 1px rgba(0, 0, 0, 0.05)
    `,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Removed flex: 1 to prevent unwanted stretching on desktop
    // Width property above will now control the size
  };

  const searchButtonStyle: React.CSSProperties = {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: glassStyle.background,
    backdropFilter: glassStyle.backdropFilter,
    WebkitBackdropFilter: glassStyle.WebkitBackdropFilter,
    border: glassStyle.border,
    boxShadow: glassStyle.boxShadow,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: "10px", // Gap between pill and button
    flexShrink: 0,
    margin: "0 5px 25px 0", // Align bottom margin with pill
  };

  return (
    <div
      style={{
        ...defaultContainerStyle,
        ...style,
        display: "flex",
        alignItems: "flex-end", // Align items to bottom if heights differ, though both are 65px
        justifyContent: "center", // Center the entire group (pill + button)
        paddingBottom: "0",
      }}
      className={className}
    >
      <div style={glassStyle}>
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: isSearchOpen
              ? "0 20px"
              : `0 ${paddingRight} 0 ${paddingLeft}`,
            display: "flex",
            alignItems: "center",
            transition: "padding 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {isSearchOpen ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                color: "#000000",
              }}
            >
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
                    style={{
                      flex: 1,
                      fontSize: "17px",
                      fontWeight: 500,
                      color: "#000000",
                      padding: 0,
                      margin: 0,
                    }}
                    type="search"
                    inputMode="search"
                    enterKeyHint="search"
                  />
                </>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
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
                    className={`liquid-tab-item ${isActive ? "active" : ""}`}
                    style={{
                      color: isActive ? "#007aff" : "#000000", // Active blue, Inactive black
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      fontSize: "10px",
                      fontWeight: 500,
                      lineHeight: 1,
                      padding: "0",
                      width: isActive ? "90px" : "50px", // Active expands significantly to fill space/nest, inactive shrinks
                      height: "56px", // Increased height to fill more of the 65px container
                      // Active state styling
                      background: isActive ? "#FFFFFF" : "transparent",
                      borderRadius: "32.5px", // Matches container radius for concentric look
                      boxShadow: isActive
                        ? "0 4px 12px rgba(0,0,0,0.15)"
                        : "none",

                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "manipulation",
                      transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)", // Springy effect
                    }}
                  >
                    {item.icon && (
                      <div
                        style={{
                          fontSize: "24px",
                          height: "24px",
                          width: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 1, // Icon opacity usually handled by color, removing manual opacity transition for simplicity unless requested
                        }}
                      >
                        {item.icon}
                      </div>
                    )}
                    <span style={{ marginTop: "2px" }}>{item.label}</span>
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
          style={searchButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            handleSearchToggle();
          }}
          className="liquid-tab-search"
          aria-label="Toggle Search"
        >
          <FontAwesomeIcon
            icon={isSearchOpen ? faTimes : faSearch}
            style={{ fontSize: "24px", color: "#000000" }}
          />
        </button>
      )}

      <style>{`
                .liquid-tab-item:not(.active):hover {
                    color: #000000 !important;
                }
                .liquid-tab-search:hover {
                     background: rgba(0, 0, 0, 0.05) !important;
                }
                .liquid-tab-search-input::placeholder {
                    color: #000000;
                    opacity: 1;
                }
            `}</style>
    </div>
  );
};
