// export const Lightbox = ({ open, onClose, title, description, children }) => {
//   if (!open) return null;

//   return (
//     <div className="lightbox-overlay">
//       <div className="lightbox-container">
//         <button className="close-button" onClick={onClose}>
//           X
//         </button>
//         {title && (
//           <div className="lightbox-header">
//             <h2>{title}</h2>
//           </div>
//         )}
//         {description && <p className="lightbox-label">{description}</p>}
//         {/* plug another component into "children" */}
//         {children}
//       </div>
//     </div>
//   );
// };
