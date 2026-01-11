import React from "react";
import { Overlay } from "../Overlay/Overlay";
import styles from "./Popover.module.css";

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
}) => {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      {/* 
                Use the glass container style.
                We add onClick={onClose} to support "clicking the popover... will close the popover"
                behavior requested for this specific component, overriding Overlay's stopPropagation.
            */}
      <div className={`${styles.container} ${className}`} onClick={onClose}>
        {title && <h3 className={styles.title}>{title}</h3>}

        <div className={styles.content}>{children}</div>
      </div>
    </Overlay>
  );
};
