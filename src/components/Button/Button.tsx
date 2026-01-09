import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    icon?: IconProp;
    rightIcon?: IconProp;
    variant?: "primary" | "secondary" | "danger" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    flat?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    icon,
    rightIcon,
    variant = "primary",
    size = "md",
    fullWidth = false,
    flat = false,
    className = "",
    style = {},
    children,
    disabled = false,
    ...props
}) => {
    const isIconOnly = !!icon && !label && !children;

    // Variant-specific colors (iOS-inspired 2025 feel)
    type VariantStyle = {
        bg: string;
        text: string;
        border: string;
        shadowColor: string;
    };

    const glassVariantStyles: Record<
        NonNullable<ButtonProps["variant"]>,
        VariantStyle
    > = {
        primary: {
            bg: "rgba(0, 122, 255, 0.32)",
            text: "#ffffff",
            border: "rgba(255,255,255,0.28)",
            shadowColor: "rgba(0, 78, 204, 0.35)",
        },
        secondary: {
            bg: "rgba(120, 120, 128, 0.24)",
            text: "#000000",
            border: "rgba(255,255,255,0.20)",
            shadowColor: "rgba(0,0,0,0.18)",
        },
        danger: {
            bg: "rgba(255, 59, 48, 0.32)",
            text: "#ffffff",
            border: "rgba(255,255,255,0.28)",
            shadowColor: "rgba(204, 47, 38, 0.35)",
        },
        ghost: {
            bg: "rgba(255, 255, 255, 0.10)",
            text: "#000000",
            border: "rgba(255,255,255,0.18)",
            shadowColor: "rgba(0,0,0,0.12)",
        },
        glass: {
            bg: "rgba(255, 255, 255, 0.15)",
            text: "#000000",
            border: "rgba(255,255,255,0.25)",
            shadowColor: "rgba(0,0,0,0.15)",
        },
    };

    // Flat styles (Solid colors, no glass effect)
    const flatVariantStyles = {
        primary: {
            bg: "#007AFF",
            text: "#ffffff",
        },
        secondary: {
            bg: "#E5E5EA",
            text: "#000000",
        },
        danger: {
            bg: "#FF3B30",
            text: "#ffffff",
        },
        ghost: {
            bg: "transparent",
            text: "#333333",
        },
        glass: {
            bg: "transparent",
            text: "#333333",
        },
    };

    const sizeStyles = {
        sm: {
            height: "36px",
            minWidth: isIconOnly ? "36px" : "90px",
            padding: isIconOnly ? "0" : "0 14px",
            fontSize: "13px",
            iconSize: "14px",
        },
        md: {
            height: "52px",
            minWidth: isIconOnly ? "52px" : "132px",
            padding: isIconOnly ? "0" : "0 22px",
            fontSize: "15px",
            iconSize: "16px",
        },
        lg: {
            height: "60px",
            minWidth: isIconOnly ? "60px" : "160px",
            padding: isIconOnly ? "0" : "0 28px",
            fontSize: "17px",
            iconSize: "18px",
        },
    };

    const vStyle = flat
        ? flatVariantStyles[variant]
        : glassVariantStyles[variant];
    const sStyle = sizeStyles[size];

    return (
        <button
            className={`liquid-glass-button ${className}`}
            disabled={disabled}
            style={{
                // Layout & sizing
                display: fullWidth ? "flex" : "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                minWidth: sStyle.minWidth,
                height: sStyle.height,
                padding: sStyle.padding,
                margin: "4px",

                // Typography
                fontSize: sStyle.fontSize,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                fontFamily: "var(--lg-font-family)",

                // Core styles (Glass vs Flat)
                background: vStyle.bg,
                color: vStyle.text,

                // Glass effects (only if not flat)
                backdropFilter: flat
                    ? "none"
                    : "blur(20px) saturate(180%) contrast(105%)",
                WebkitBackdropFilter: flat
                    ? "none"
                    : "blur(20px) saturate(180%) contrast(105%)",
                border: flat
                    ? "none"
                    : `1px solid ${glassVariantStyles[variant].border}`,
                boxShadow: flat
                    ? "none"
                    : `
                  0 8px 32px ${glassVariantStyles[variant].shadowColor},
                  inset 0 1px 1px rgba(255,255,255,0.45),
                  inset 0 -1px 1px rgba(0,0,0,0.12)
                `,

                borderRadius: "26px", // perfect pill shape
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.48 : 1,
                transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
                ...style,
            }}
            {...props}
        >
            {/* Subtle inner shine overlay - Only for glass/non-flat mode */}
            {!flat && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
                        pointerEvents: "none",
                        opacity: disabled ? 0.4 : 0.75,
                        transition: "opacity 0.4s ease",
                    }}
                />
            )}

            {/* Content */}
            {icon && (
                <FontAwesomeIcon
                    icon={icon}
                    style={{ fontSize: isIconOnly ? "21px" : "17px" }}
                />
            )}
            {label && <span>{label}</span>}
            {!label && children}

            {/* Right Icon */}
            {rightIcon && (
                <FontAwesomeIcon
                    icon={rightIcon}
                    style={{ fontSize: "12px", opacity: 0.8, marginLeft: label || children ? "6px" : "0" }}
                />
            )}
        </button>
    );
};
