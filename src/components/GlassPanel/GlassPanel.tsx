import React from "react";
import "./GlassPanel.css";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`liquid-glass-panel ${className}`} {...props}>
      {children}
    </div>
  );
};
