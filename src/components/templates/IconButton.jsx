import { useState } from "react";

export const IconButton = ({
  iconSrc,
  altText,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };
  const handleMouseLeave = (e) => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };
  return (
    <img
      src={iconSrc}
      alt={altText || "Icon"}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`icon-button ${className || ""} ${isHovered ? "hovered" : ""}`}
    />
  );
};
