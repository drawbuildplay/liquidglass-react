import React from "react";
import styles from "./Grid.module.css";

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
      className={`${styles.container} ${className}`}
      style={{
        width: "100%",
        ...style,
      }}
      {...props}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
};
