import { useState } from "react";
import "./IconTooltipButton.css";
export const IconTooltipButton = ({ iconSrc, tooltipContent, onClick, className = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="icon-tooltip-container">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`icon-tooltip-button ${className}`}>
        <img src={iconSrc} className={`icon-button ${className}`} />
      </div>

      {showTooltip && <div className="tooltip-content">{tooltipContent}</div>}
    </div>
  );
};
