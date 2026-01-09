import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export interface ComboBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "default" | "transparent";
  label?: string;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  variant = "default",
  style,
  children,
  label,
  ...props
}) => {
  const isTransparent = variant === "transparent";

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    marginBottom: label ? "8px" : "0",
  };

  const selectStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    padding: "12px",
    paddingRight: "36px", // Space for chevron
    fontSize: "15px",
    color: "inherit",
    fontFamily: "inherit",
    appearance: "none",
    WebkitAppearance: "none",
    ...style,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "14px",
            fontWeight: 500,
            opacity: 0.8,
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: isTransparent ? "transparent" : "rgba(0,0,0,0.05)",
          borderRadius: isTransparent ? "0" : "10px",
          backdropFilter: isTransparent ? "none" : "blur(10px)",
          WebkitBackdropFilter: isTransparent ? "none" : "blur(10px)",
          border: isTransparent ? "none" : undefined,
        }}
      >
        <select {...props} style={selectStyle}>
          {children}
        </select>

        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            opacity: 0.6,
            fontSize: "12px",
          }}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </div>
  );
};
