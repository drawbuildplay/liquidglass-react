import React from "react";

export interface ToolbarProps {
  children?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  children,
  leftElement,
  rightElement,
  title,
  className,
  style,
}) => {
  const defaultContainerStyle: React.CSSProperties = {
    position: "sticky",
    paddingTop: "20px", // Safe area spacing
    top: 0,
    zIndex: 100,
    width: "100%",
    minHeight: "44px", // Reduced height to match iOS standard better
  };

  const containerStyle = { ...defaultContainerStyle, ...style };

  return (
    <div style={containerStyle} className={className}>
      {/* Glass Background Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Content Layer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "0 5px", // Removed vertical padding, kept horizontal
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {leftElement}
        </div>

        {title && (
          <div
            style={{
              flex: "0 0 auto",
              fontWeight: 600,
              fontSize: "17px",
              margin: "0 5px",
              textAlign: "center",
            }}
          >
            {title}
          </div>
        )}

        {children && (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            {children}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {rightElement}
        </div>
      </div>
    </div>
  );
};
