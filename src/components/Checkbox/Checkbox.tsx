import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    ...style,
  };

  const boxStyle: React.CSSProperties = {
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    background: "rgba(0,0,0,0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: label ? "10px" : "0",
    transition: "all 0.2s ease",
    border: checked ? "none" : "1px solid transparent", // visual balance
    backgroundColor: checked ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.05)",
    color: "white",
    fontSize: "12px",
  };

  return (
    <div
      className={className}
      style={containerStyle}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={label || "Checkbox"}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div style={boxStyle}>
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </div>
      {label && (
        <span style={{ fontSize: "15px", fontWeight: 500 }}>{label}</span>
      )}
    </div>
  );
};
