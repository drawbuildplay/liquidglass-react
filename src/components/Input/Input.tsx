import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search" | "transparent";
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  variant = "default",
  style,
  leftElement,
  rightElement,
  ...props
}) => {
  const isSearch = variant === "search";
  const isTransparent = variant === "transparent";

  return (
    <div className={styles.container} style={style}>
      <div
        className={`${styles.wrapper} ${isTransparent ? styles.transparent : ""}`}
      >
        {isSearch && (
          <div className={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        )}
        {leftElement && <div className={styles.leftElement}>{leftElement}</div>}
        <input
          {...props}
          className={`${styles.input} ${isSearch || leftElement ? styles.paddingLeftSearch : ""} ${rightElement ? styles.paddingRightElement : ""}`}
        />
        {rightElement && (
          <div className={styles.rightElement}>{rightElement}</div>
        )}
      </div>
    </div>
  );
};
