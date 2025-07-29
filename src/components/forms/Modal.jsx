import "./Modal.css";

export const Modal = ({ open, onClose, title, description, children }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {title && (
          <div className="modal-header">
            <h1>{title}</h1>
          </div>
        )}
        {description && <p className="modal-label">{description}</p>}
        {/* plug another component into "children" */}
        {children}
      </div>
    </div>
  );
};
