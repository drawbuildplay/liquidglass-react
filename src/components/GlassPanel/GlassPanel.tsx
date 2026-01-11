import React from "react";
import styles from "./GlassPanel.module.css";

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
    <div className={`${styles.panel} ${className}`} {...props}>
      {children}
    </div>
  );
};
