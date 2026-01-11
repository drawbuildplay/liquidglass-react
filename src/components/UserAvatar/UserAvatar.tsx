// Local definition to avoid dependency on missing models
interface User {
  photoURL?: string;
  displayName?: string;
  username?: string;
  userLevel?: {
    defaultImage?: string;
    bourbonCount?: number;
  };
}

import React from "react";
import styles from "./UserAvatar.module.css";

interface UserAvatarProps {
  user?: Partial<User>;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
  // Allow overriding specifics if we don't have a full User object
  photoURL?: string;
  displayName?: string;
  levelDefaultImage?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = "100%",
  className = "",
  style = {},
  photoURL,
  displayName,
  levelDefaultImage,
}) => {
  // Resolve effective values
  const effectivePhotoURL = photoURL ?? user?.photoURL;
  const effectiveDisplayName =
    displayName ?? user?.displayName ?? user?.username ?? "User";

  // Resolve default image from level
  const effectiveDefaultImage =
    levelDefaultImage ?? user?.userLevel?.defaultImage;

  // Note: Previous logic using UserUtils.getLevelInfo removed to decouple component.
  // Pass levelDefaultImage prop if calculation is needed.

  // Default to 'New Collector' (disappointment.png) if no other info available
  // This ensures consistency: no photo -> check level -> fallback to level 1 default
  const finalDefaultImage = effectiveDefaultImage || "/disappointment.png";

  const imgSrc = effectivePhotoURL || finalDefaultImage;

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        ...style,
      }}
      title={effectiveDisplayName}
    >
      <img
        src={imgSrc}
        alt={effectiveDisplayName}
        className={styles.image}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          // Prevent infinite loop if fallback also fails, but try fallback first
          if (
            target.src !== window.location.origin + finalDefaultImage &&
            finalDefaultImage
          ) {
            target.src = finalDefaultImage;
          }
        }}
      />
    </div>
  );
};
