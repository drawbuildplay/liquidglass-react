import React from "react";
import { Overlay } from "../Overlay/Overlay";
import styles from "./Alert.module.css";

export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "cancel" | "destructive";
}

export interface AlertProps {
  isOpen: boolean;
  title: string;
  message?: string;
  actions: AlertAction[];
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  title,
  message,
  actions,
  onClose,
}) => {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.actions}>
          {actions.map((action, index) => {
            const isDestructive = action.variant === "destructive";
            const isCancel = action.variant === "cancel";
            const isPrimary = !isDestructive && !isCancel;

            let buttonClass = styles.cancel;
            if (isDestructive) buttonClass = styles.destructive;
            else if (isPrimary) buttonClass = styles.primary;

            return (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  onClose?.();
                }}
                className={`${styles.button} ${buttonClass}`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};
