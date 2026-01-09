import React from "react";
import { Overlay } from "../Overlay/Overlay";

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
  const containerStyle: React.CSSProperties = {
    // Glass effect - Matched to Alert.tsx
    backgroundColor: "rgba(245, 245, 250, 0.65)",
    backdropFilter: "blur(40px) saturate(190%) contrast(115%)",
    WebkitBackdropFilter: "blur(40px) saturate(190%) contrast(115%)",
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: `
            0 25px 60px rgba(0,0,0,0.3),
            inset 0 1px 2px rgba(255, 255, 255, 0.7),
            inset 0 -1px 1px rgba(0, 0, 0, 0.05)
        `,

    // Layout
    width: "500px", // Fixed max width preferred
    maxWidth: "90vw", // Responsive constraint
    maxHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    cursor: "pointer",
    position: "relative",
    color: "#1d1d1f", // Explicit dark color
    fontFamily: "var(--lg-font-family)",
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      {/* 
                Use the glass container style.
                We add onClick={onClose} to support "clicking the popover... will close the popover"
                behavior requested for this specific component, overriding Overlay's stopPropagation.
            */}
      <div style={containerStyle} onClick={onClose} className={className}>
        {title && (
          <h3
            style={{
              color: "#1d1d1f",
              marginTop: 0,
              marginBottom: "16px",
              fontSize: "19px",
              fontWeight: 700,
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            {title}
          </h3>
        )}

        <div
          style={{
            color: "#424245", // Dark grey for content
            fontSize: "15px",
            lineHeight: "1.5",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
};
