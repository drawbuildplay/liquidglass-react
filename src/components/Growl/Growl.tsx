import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

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
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        pointerEvents: "none",
        animation:
          "growl-slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 24px",
          borderRadius: "30px", // Pill shape
          background: "rgba(245, 245, 250, 0.95)", // Reduced transparency
          backdropFilter: "blur(40px) saturate(190%) contrast(115%)",
          WebkitBackdropFilter: "blur(40px) saturate(190%) contrast(115%)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.4)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          fontFamily: "var(--lg-font-family)",
          whiteSpace: "nowrap",
        }}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            style={{ color: "#007aff", fontSize: "16px" }}
          />
        )}
        <span style={{ fontWeight: 500, fontSize: "15px", color: "#000000" }}>
          {message}
        </span>
      </div>
      {/* @ts-ignore */}
      <style jsx>{`
        @keyframes growl-slide-down {
          from {
            transform: translate(-50%, -150%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
