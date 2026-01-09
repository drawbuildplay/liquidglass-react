import React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "transparent";
  height?: string | number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  variant = "default",
  style,
  height,
  ...props
}) => {
  const isTransparent = variant === "transparent";

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const textareaStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    height: height || "auto",
    minHeight: height ? undefined : "100px",
    padding: "12px",
    fontSize: "15px",
    color: "inherit",
    fontFamily: "inherit",
    resize: "vertical",
    ...style,
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          width: "100%",
          display: "flex",
          background: isTransparent ? "transparent" : "rgba(0,0,0,0.05)",
          borderRadius: isTransparent ? "0" : "10px",
          backdropFilter: isTransparent ? "none" : "blur(10px)",
          WebkitBackdropFilter: isTransparent ? "none" : "blur(10px)",
          border: isTransparent ? "none" : undefined,
          overflow: "hidden",
        }}
      >
        <textarea {...props} style={textareaStyle} />
      </div>
    </div>
  );
};
