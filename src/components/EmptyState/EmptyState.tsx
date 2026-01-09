import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { GlassPanel } from "../GlassPanel/GlassPanel";

export interface EmptyStateProps {
    icon?: IconProp;
    imageSrc?: string;
    imageStyle?: React.CSSProperties;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    imageSrc,
    imageStyle,
    title,
    description,
    action,
}) => {
    React.useEffect(() => {
        const appContainer = document.querySelector(".app-container");
        if (appContainer) {
            appContainer.classList.add("empty-state-active");
        }
        return () => {
            if (appContainer) {
                appContainer.classList.remove("empty-state-active");
            }
        };
    }, []);

    return (
        <GlassPanel
            style={{
                width: "320px",
                maxWidth: "100%",
                alignItems: "center",
                textAlign: "center",
                color: "#8e8e93", // Keeping original text color preference for readability on light backgrounds if panel is too clear
                boxSizing: "border-box",
            }}
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={title}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        marginBottom: "16px",
                        ...imageStyle,
                    }}
                />
            ) : (
                icon && (
                    <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                )
            )}
            <h3
                style={{
                    margin: "0 0 8px 0",
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "#000000",
                    lineHeight: "1.2",
                }}
            >
                {title}
            </h3>
            {description && (
                <p
                    style={{
                        margin: "8px 0 24px 0",
                        fontSize: "15px",
                        lineHeight: "1.5",
                        color: "#666666",
                    }}
                >
                    {description}
                </p>
            )}
            {action}
        </GlassPanel>
    );
};
