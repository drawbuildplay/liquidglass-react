import React from "react";
import styles from "./TextArea.module.css";

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

  // Height overrides need to stay inline (or be handled via CSS variables/dynamic style)
  // Since height is an optional prop that defaults to 'auto' in the original logic,
  // we can merge it into the style prop for the textarea element.

  const dynamicStyle: React.CSSProperties = {
    height: height || "auto",
    minHeight: height ? undefined : "100px", // Override min-height if specific height set? Original: minHeight: height ? undefined : "100px"
    ...style,
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.wrapper} ${isTransparent ? styles.transparent : ""}`}
      >
        <textarea {...props} className={styles.textarea} style={dynamicStyle} />
      </div>
    </div>
  );
};
