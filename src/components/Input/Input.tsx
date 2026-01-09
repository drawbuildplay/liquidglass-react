import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    ...style,
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    padding: "8px 12px",
    paddingLeft: isSearch ? "36px" : "12px",
    fontSize: "15px",
    color: "inherit",
    fontFamily: "inherit",
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: isTransparent ? "transparent" : "rgba(0,0,0,0.05)",
          borderRadius: isTransparent ? "0" : "10px",
          backdropFilter: isTransparent ? "none" : "blur(10px)",
          WebkitBackdropFilter: isTransparent ? "none" : "blur(10px)",
          border: isTransparent ? "none" : undefined,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {isSearch && (
          <div
            style={{
              paddingLeft: "12px",
              paddingRight: "8px",
              display: "flex",
              alignItems: "center",
              color: "#8e8e93",
              pointerEvents: "none",
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
        )}
        {leftElement && (
          <div
            style={{
              paddingLeft: "12px",
              paddingRight: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {leftElement}
          </div>
        )}
        <input
          {...props}
          style={{
            ...inputStyle,
            width: "auto",
            flex: 1,
            paddingLeft: isSearch || leftElement ? "12px" : "12px",
            paddingRight: rightElement ? "0" : "12px",
          }}
        />
        {rightElement && (
          <div
            style={{
              paddingRight: "12px",
              paddingLeft: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};
