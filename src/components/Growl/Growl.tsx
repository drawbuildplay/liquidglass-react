import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./Growl.module.css";

export interface GrowlProps {
  message: string;
  icon?: IconProp;
  visible: boolean;
  onDismiss?: () => void;
  duration?: number;
}

export const Growl: React.FC<GrowlProps> = ({
  message,
  icon,
  visible,
  onDismiss,
  duration = 3000,
}) => {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={styles.icon}
          />
        )}
        <span className={styles.message}>
          {message}
        </span>
      </div>
    </div>
  );
};
