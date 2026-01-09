import React, { useState, useRef, type ReactNode } from "react";
import "./SwipeableRow.css";

interface SwipeableRowProps {
  children: ReactNode;
  /** Callback for left swipe (negative X translation). E.g., Delete. */
  onSwipeLeft?: () => void;
  /** Callback for right swipe (positive X translation). E.g., Wishlist/Follow. */
  onSwipeRight?: () => void;

  // Customization
  leftActionColor?: string; // Default: red (#ef4444)
  leftActionIcon?: ReactNode; // E.g., Trash icon

  rightActionColor?: string; // Default: green (#10b981)
  rightActionIcon?: ReactNode; // E.g., Star/Heart icon

  threshold?: number; // Default: 100px
  maxSwipe?: number; // Default: 150px

  className?: string;
  style?: React.CSSProperties;

  // To prevent swipes on specific sub-elements
  // We expect the consumer to use e.stopPropagation() on child elements' Start/Down events if needed.
}

export const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftActionColor = "#ef4444",
  leftActionIcon,
  rightActionColor = "#10b981",
  rightActionIcon,
  threshold = 100,
  maxSwipe = 150,
  className = "",
  style = {},
}) => {
  // Swipe state
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [actionState, setActionState] = useState<
    "idle" | "swipingLeft" | "swipingRight"
  >("idle");
  const rowRef = useRef<HTMLDivElement>(null);

  // Ref to track if actual movement occurred to distinguish click vs swipe
  const isSwipingRef = useRef(false);

  // Permissions
  const canSwipeLeft = !!onSwipeLeft;
  const canSwipeRight = !!onSwipeRight;
  const canSwipe = canSwipeLeft || canSwipeRight;

  // --- Touch Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canSwipe) return;
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    isSwipingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canSwipe || startX === null) return;

    const touchX = e.touches[0].clientX;
    const diff = touchX - startX;

    // Check for minimal movement to flag as swipe
    if (Math.abs(diff) > 5) {
      isSwipingRef.current = true;
    }

    // Direction restriction
    let newX = 0;
    if (canSwipeLeft && diff < 0) {
      newX = Math.max(diff, -maxSwipe);
    } else if (canSwipeRight && diff > 0) {
      newX = Math.min(diff, maxSwipe);
    }

    if (newX !== 0) {
      setCurrentX(newX);
    }
  };

  const handleTouchEnd = () => {
    if (!canSwipe) return;
    finishSwipe();
  };

  // --- Mouse Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canSwipe) return;
    setStartX(e.clientX);
    setIsDragging(true);
    isSwipingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canSwipe || startX === null || !isDragging) return;

    const clientX = e.clientX;
    const diff = clientX - startX;

    // Check for minimal movement to flag as swipe
    if (Math.abs(diff) > 5) {
      isSwipingRef.current = true;
    }

    let newX = 0;
    if (canSwipeLeft && diff < 0) {
      newX = Math.max(diff, -maxSwipe);
    } else if (canSwipeRight && diff > 0) {
      newX = Math.min(diff, maxSwipe);
    }

    if (newX !== 0) {
      setCurrentX(newX);
    }
  };

  const handleMouseUp = () => {
    if (!canSwipe || !isDragging) return;
    finishSwipe();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setCurrentX(0);
      setStartX(null);
      setIsDragging(false);
      isSwipingRef.current = false;
    }
  };

  // --- Click Interception ---
  const handleClickCapture = (e: React.MouseEvent) => {
    // If we detected a swipe movement, stop the click from interacting with children
    if (isSwipingRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // --- Shared Logic ---
  const finishSwipe = () => {
    if (canSwipeLeft && currentX < -threshold) {
      // Trigger Left Action (Delete)
      setActionState("swipingLeft");
      setTimeout(() => {
        if (onSwipeLeft) onSwipeLeft();
        // Reset after action if the component is still mounted/needs reset
        // Usually for delete, the item unmounts. For persistence, we reset.
        // We'll reset just in case.
        setTimeout(() => resetState(), 300);
      }, 300);
    } else if (canSwipeRight && currentX > threshold) {
      // Trigger Right Action (Wishlist/Follow)
      setActionState("swipingRight");
      setTimeout(() => {
        if (onSwipeRight) onSwipeRight();
        setTimeout(() => resetState(), 500);
      }, 300);
    } else {
      resetState();
    }

    setStartX(null);
    setIsDragging(false);
  };

  const resetState = () => {
    setActionState("idle");
    setCurrentX(0);
  };

  // --- Rendering ---

  // Background Layer Props
  let backgroundColor = "transparent";
  let icon = null;
  let justifyContent = "center"; // safe default
  let paddingLeft = "0";
  let paddingRight = "0";

  if (currentX < 0) {
    // Revealing Right Side (Swipe Left)
    backgroundColor = leftActionColor;
    icon = leftActionIcon;
    justifyContent = "flex-end";
    paddingRight = "24px";
  } else if (currentX > 0) {
    // Revealing Left Side (Swipe Right)
    backgroundColor = rightActionColor;
    icon = rightActionIcon;
    justifyContent = "flex-start";
    paddingLeft = "24px";
  }

  const foregroundStyle: React.CSSProperties = {
    transform: `translateX(${currentX}px)`,
    transition: isDragging
      ? "none"
      : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
    ...(actionState === "swipingLeft"
      ? { transform: "translateX(-100%)", opacity: 0 }
      : {}),
    // Add more animations if needed
    position: "relative",
    zIndex: 1,
    // backgroundColor: "#ffffff", // Removed to allow transparency/custom styles
    cursor: canSwipe ? (isDragging ? "grabbing" : "grab") : "default",
    userSelect: "none",
    ...style, // Allow overriding
  };

  return (
    <div
      className={`swipeable-row-container ${className}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background Layer */}
      <div
        className="swipeable-row-background"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent,
          paddingLeft,
          paddingRight,
          zIndex: 0,
        }}
      >
        {icon}
      </div>

      {/* Foreground Content */}
      <div
        ref={rowRef}
        className="swipeable-row-content"
        style={foregroundStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClickCapture={handleClickCapture}
      >
        {children}
      </div>
    </div>
  );
};
