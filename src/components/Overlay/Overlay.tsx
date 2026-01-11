import React from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";

export interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
};
