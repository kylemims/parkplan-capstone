import { useState } from "react";

export const HoverReveal = ({ children, revealContent, className = "" }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <span
      className={`hover-reveal ${className}`}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      {children}
      {isHovering && revealContent}
    </span>
  );
};
