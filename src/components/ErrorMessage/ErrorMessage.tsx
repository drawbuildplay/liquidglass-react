import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className={styles.icon}
      />
      <span className={styles.text}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};
