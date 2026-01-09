import React from "react";
import "./Grid.css";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: number; // Optional custom gap, though CSS handles defaults well
}

export const Grid: React.FC<GridProps> = ({
  children,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <div
      className={`liquid-glass-grid-container ${className}`}
      style={{
        width: "100%",
        ...style,
      }}
      {...props}
    >
      <div className="liquid-glass-grid-content">{children}</div>
    </div>
  );
};
