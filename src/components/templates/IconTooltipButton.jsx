import { useState } from "react";
import "./IconTooltipButton.css"; // Ensure you have the appropriate CSS for styling

export const IconTooltipButton = ({
  iconSrc,
  // altText,
  tooltipContent,
  onClick,
  className = "",
}) => {
  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  // Handlers for mouse events to show/hide tooltip
  // These can be customized further if needed
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Render the icon button with tooltip functionality
  return (
    <div className="icon-tooltip-container">
      {/* Icon button with tooltip functionality */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`icon-tooltip-button ${className}`}>
        <img src={iconSrc} className={`icon-button ${className}`} />
      </div>
      {/* Tooltip content that appears on hover */}
      {showTooltip && <div className="tooltip-content">{tooltipContent}</div>}
    </div>
  );
};
