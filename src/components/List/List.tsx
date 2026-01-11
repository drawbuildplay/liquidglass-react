import React from "react";
import styles from "./List.module.css";

interface ListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const List: React.FC<ListProps> = ({
  children,
  className = "",
  style,
}) => {
  return (
    <div className={`${styles.list} ${className}`} style={style}>
      {children}
    </div>
  );
};

interface ListItemProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  className = "",
  style,
  onClick,
  title,
  subtitle,
  rightElement,
}) => {
  return (
    <div
      className={`${styles.listItem} ${onClick ? styles.clickable : styles.defaultCursor} ${className}`}
      style={style}
      onClick={onClick}
    >
      <div className={styles.itemContent}>
        {title && <div className={styles.itemTitle}>{title}</div>}
        {subtitle && <div className={styles.itemSubtitle}>{subtitle}</div>}
        {children}
      </div>
      {rightElement && <div className={styles.itemRight}>{rightElement}</div>}
    </div>
  );
};

interface ListCardProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const ListCard: React.FC<ListCardProps> = ({
  left,
  right,
  children,
  className = "",
  style,
  onClick,
}) => {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={style}
      onClick={onClick}
    >
      {left && <div className={styles.left}>{left}</div>}
      <div className={styles.center}>{children}</div>
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
};
