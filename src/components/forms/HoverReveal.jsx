import { useState } from "react";
import "./HoverReveal.css";

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

// import { useState } from "react";
// import "./HoverReveal.css";

// export const HoverReveal = ({ children, revealContent, className = "" }) => {
//   const [isHovering, setIsHovering] = useState(false);

//   return (
//     <span
//       className={`hover-reveal ${className}`}
//       style={{ position: "relative", display: "inline-block" }}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}>
//       {children}
//       {isHovering && revealContent}
//     </span>
//   );
// };

// import { useState } from "react";
// import "./HoverReveal.css";

// export const HoverReveal = ({ children, revealContent, className = "" }) => {
//   const [isHovering, setIsHovering] = useState(false);
//   const handleMouseEnter = () => setIsHovering(true);
//   const handleMouseLeave = () => setIsHovering(false);

//   return (
//     <div className={`hover-reveal ${className}`}>
//       <div
//         onMouseEnter={handleMouseEnter}
//         className="hover-reveal__content"
//         onMouseLeave={handleMouseLeave}>
//         {children}
//         {isHovering && <div>{revealContent}</div>}
//       </div>
//     </div>
//   );
// };
