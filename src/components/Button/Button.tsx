import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./Button.module.css";

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

    const variantClass = styles[variant];
    const modeClass = flat ? styles.flatBase : styles.glassBase;
    const sizeClass = styles[size];
    const iconOnlyClass = isIconOnly ? styles.iconOnly : "";
    const fullWidthClass = fullWidth ? styles.fullWidth : "";

    const combinedClassName = [
        styles.button,
        variantClass,
        modeClass,
        sizeClass,
        iconOnlyClass,
        fullWidthClass,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={combinedClassName}
            disabled={disabled}
            style={style}
            {...props}
        >
            {/* Subtle inner shine overlay - Only for glass/non-flat mode */}
            {!flat && <div className={styles.shine} />}

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
                    style={{
                        fontSize: "12px",
                        opacity: 0.8,
                        marginLeft: label || children ? "6px" : "0",
                    }}
                />
            )}
        </button>
    );
};

