import "./Modal.css";

export const Modal = ({ open, onClose, title, description, children }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
        )}
        {description && <p className="modal-label">{description}</p>}
        {/* plug another component into "children" */}
        {children}
      </div>
    </div>
  );
};
