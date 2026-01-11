import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import {
  faSearch,
  faTimes,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Search.module.css";

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
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.KeyboardEvent<HTMLInputElement>;
        onKeyDown(syntheticEvent);
      }
    }
  };

  const isTransparent = variant === "transparent";

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {isTransparent && (
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
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
        className={styles.input}
        type={type}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
      />

      {showCloseButton && (
        <div
          className={`${styles.closeButtonWrapper} ${showSearchButton ? styles.hasSearchButton : ""}`}
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
            className={`${styles.closeButton} ${isTransparent ? styles.transparent : ""}`}
            title={searchTerm.trim() ? "Clear search" : "Close search"}
          />
        </div>
      )}

      {/* Search Action Button */}
      {showSearchButton && !hideSearchButton && (
        <div className={styles.actionButtonWrapper}>
          <Button
            onClick={handleSearchClick}
            disabled={!searchTerm.trim() || disabled}
            variant="secondary"
            className={styles.actionButton}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      )}
    </div>
  );
};
