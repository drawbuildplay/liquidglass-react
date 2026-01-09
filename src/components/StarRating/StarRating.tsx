import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export interface StarRatingProps {
  rating: number | undefined;
  onChange?: (newRating: number) => void;
  readonly?: boolean;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  onChange,
  readonly = false,
  size = 24,
  activeColor = "#FFD700", // Gold
  inactiveColor = "#E0E0E0", // Light Gray
  style,
  className = "",
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Create array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  // Handle click on star
  const handleClick = (selectedRating: number) => {
    if (readonly) return;
    if (onChange) {
      // If clicking on already selected rating, clear the rating
      onChange(rating === selectedRating ? 0 : selectedRating);
    }
  };

  return (
    <div
      className={`star-rating ${className}`}
      style={{
        display: "flex",
        gap: "4px",
        cursor: readonly ? "default" : "pointer",
        ...style,
      }}
      onMouseLeave={!readonly ? () => setHoverRating(0) : undefined}
    >
      {stars.map((star) => {
        const isActive = star <= (hoverRating || rating);

        return (
          <span
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={!readonly ? () => setHoverRating(star) : undefined}
            style={{
              color: isActive ? activeColor : inactiveColor,
              fontSize: `${size}px`,
              transition: "color 0.2s ease, transform 0.1s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: !readonly && isActive ? "scale(1.1)" : "scale(1)",
            }}
          >
            <FontAwesomeIcon icon={faStar} />
          </span>
        );
      })}
    </div>
  );
};
