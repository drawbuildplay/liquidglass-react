import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import {
  faSearch,
  faTimes,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (term: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showCloseButton?: boolean;
  onClose?: () => void;
  showSearchButton?: boolean;
  searchButtonText?: string;

  hideSearchButton?: boolean;
  autoFocus?: boolean;
  variant?: "default" | "transparent";
  id?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  enterKeyHint?: React.InputHTMLAttributes<HTMLInputElement>["enterKeyHint"];
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search",
  disabled = false,
  className = "",
  style,
  showCloseButton = false,
  onClose,
  showSearchButton = false,
  searchButtonText: _searchButtonText = "Search",

  hideSearchButton = false,
  autoFocus = false,
  variant = "default",
  id,
  onKeyDown,
  type = "text",
  inputMode,
  enterKeyHint,
}) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState<string>("");

  // Use external value if provided, otherwise use internal state
  const searchTerm = value !== undefined ? value : internalSearchTerm;

  const handleSearchTermChange = (newValue: string) => {
    if (value === undefined) {
      setInternalSearchTerm(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    } else if (e.key === "Enter") {
      const currentValue = e.currentTarget.value.trim();
      if (currentValue && onSearch) {
        onSearch(currentValue);
      }
    }
  };

  const handleSearchClick = () => {
    const currentValue = searchTerm.trim();
    if (currentValue) {
      if (onSearch) {
        onSearch(currentValue);
      }

      // Also trigger onKeyDown if provided for compatibility
      if (onKeyDown) {
        const syntheticEvent = {
          key: "Enter",
          currentTarget: { value: currentValue },
          preventDefault: () => { },
          stopPropagation: () => { },
        } as React.KeyboardEvent<HTMLInputElement>;
        onKeyDown(syntheticEvent);
      }
    }
  };

  const isTransparent = variant === "transparent";

  return (
    <div
      className={`search-container ${className}`}
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
        ...style,
      }}
    >
      {isTransparent && (
        <FontAwesomeIcon
          icon={faSearch}
          style={{ fontSize: "18px", color: "#000000", marginRight: "10px" }}
        />
      )}
      <Input
        id={id}
        variant={variant === "transparent" ? "transparent" : "search"} // Use search variant for default, transparent for transparent
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete="off"
        style={{
          height: "44px", // explicit height often helps
          ...style, // allow overrides but verify if this duplicates container styles
        }}
        type={type}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
      />

      {showCloseButton && (
        <div
          style={{
            position: "absolute",
            right: showSearchButton ? "50px" : "8px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <Button
            variant="ghost"
            onClick={() => {
              if (searchTerm.trim()) {
                handleSearchTermChange("");
              } else if (onClose) {
                onClose();
              }
            }}
            icon={faTimes}
            style={{
              width: "30px",
              height: "30px",
              padding: 0,
              borderRadius: "50%",
              color: isTransparent ? "#333" : "#999",
            }}
            title={searchTerm.trim() ? "Clear search" : "Close search"}
          />
        </div>
      )}

      {/* Search Action Button */}
      {showSearchButton && !hideSearchButton && (
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <Button
            onClick={handleSearchClick}
            disabled={!searchTerm.trim() || disabled}
            variant="secondary"
            style={{
              height: "32px",
              padding: "0",
              minWidth: "32px",
              borderRadius: "50%",
              fontSize: "14px",
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      )}
    </div>
  );
};
