import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { GlassPanel } from "../GlassPanel/GlassPanel";
import styles from "./EmptyState.module.css";

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
        <GlassPanel className={styles.container}>
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={title}
                    className={styles.image}
                    style={imageStyle}
                />
            ) : (
                icon && (
                    <div className={styles.iconWrapper}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                )
            )}
            <h3 className={styles.title}>
                {title}
            </h3>
            {description && (
                <p className={styles.description}>
                    {description}
                </p>
            )}
            {action}
        </GlassPanel>
    );
};
