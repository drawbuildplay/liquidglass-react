import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
}) => {
  return (
    <div
      style={{
        background: "rgba(255, 59, 48, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 59, 48, 0.3)",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#FF3B30",
        fontSize: "15px",
        fontWeight: 500,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <FontAwesomeIcon
        icon={faExclamationCircle}
        style={{ fontSize: "18px" }}
      />
      <span style={{ flex: 1, lineHeight: "1.4" }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.7,
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};
