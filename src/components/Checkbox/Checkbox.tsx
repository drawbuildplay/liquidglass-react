import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string; // Add className prop
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
  className,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ""} ${className || ""}`}
      style={style}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={label || "Checkbox"}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        className={`${styles.box} ${checked ? styles.checked : ""} ${label ? styles.hasLabel : ""}`}
      >
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};
