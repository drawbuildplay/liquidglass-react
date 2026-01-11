import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./ComboBox.module.css";

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

  return (
    <div className={`${styles.container} ${label ? styles.hasLabel : ""}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.wrapper} ${isTransparent ? styles.transparent : ""}`}
      >
        <select {...props} style={style} className={styles.select}>
          {children}
        </select>

        <div className={styles.chevron}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </div>
  );
};
