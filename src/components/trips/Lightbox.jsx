export const Lightbox = ({ open, onClose, title, label, children }) => {
  if (!open) return null;

  return (
    <div className="lightbox-container">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      {title && (
        <div className="lightbox-header">
          <h2>{title}</h2>
        </div>
      )}
      {children && <p className="lightbox-label">{label}</p>}
      {/* plug another component into "children" */}
      {children}
    </div>
  );
};
