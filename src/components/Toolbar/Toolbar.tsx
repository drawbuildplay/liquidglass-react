import React from "react";
import styles from "./Toolbar.module.css";

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
  className = "",
  style,
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {/* Glass Background Layer */}
      <div className={styles.glassBackground} />

      {/* Content Layer */}
      <div className={styles.content}>
        <div className={styles.left}>{leftElement}</div>

        {title && <div className={styles.title}>{title}</div>}

        {children && <div className={styles.center}>{children}</div>}

        <div className={styles.right}>{rightElement}</div>
      </div>
    </div>
  );
};
