import React from "react";
import { Button, type ButtonProps } from "../Button/Button";
import {
  faLink,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ShareButtonProps extends Omit<ButtonProps, "onClick"> {
  url?: string;
  shareTitle?: string;
  text?: string;
  onShare?: () => void;
  onCopy?: () => void;
  onError?: (error: any) => void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  shareTitle,
  text,
  onShare,
  onCopy,
  onError,
  icon = faArrowUpFromBracket as IconProp, // Default to share icon
  ...buttonProps
}) => {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const finalShareTitle = shareTitle || document.title;
    const shareText = text || "Check this out!";

    // Try Native Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: finalShareTitle,
          text: shareText,
          url: shareUrl,
        });
        onShare?.();
      } catch (error: any) {
        // User cancelled or share failed
        if (error.name === "AbortError") {
          return; // Ignore user cancellation
        }
        console.warn("Share API failed, falling back to clipboard", error);

        // Fallback to clipboard
        await copyToClipboard(shareUrl);
      }
    } else {
      // Fallback to clipboard if Share API not supported
      await copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        notifySuccess();
      } else {
        // Fallback for older browsers / non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "0";
        textArea.style.top = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          notifySuccess();
        } else {
          throw new Error("Fallback copy failed");
        }
      }
    } catch (error) {
      console.error("Copy to clipboard failed:", error);
      onError?.(error);
      // Fallback alert if everything fails
      alert(`Could not share. Here is the link:\n${text}`);
    }
  };

  const notifySuccess = () => {
    onCopy?.();
    // Dispatch global growl event for the app
    window.dispatchEvent(
      new CustomEvent("show-growl", {
        detail: {
          message: "Link copied to clipboard! 📋",
          icon: faLink,
        },
      }),
    );
  };

  return (
    <Button
      onClick={handleShare}
      icon={icon}
      aria-label={shareTitle || text || "Share"}
      title={shareTitle || text || "Share"}
      {...buttonProps}
    />
  );
};
