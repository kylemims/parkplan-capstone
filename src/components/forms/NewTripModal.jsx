import "./NewTripModal.css";
import { CreateNewTripForm } from "./CreateNewTripForm.jsx";

export const NewTripModal = ({ open, onClose }) => {
  if (!open) {
    return null; // Don't render anything if the modal is not open
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="close-button" onClick={onClose}>
          X
        </p>
        <div className="modal-header">
          <h2>Create a New Trip</h2>
        </div>
        <div className="modal-subheader">
          <h4>Plan your next adventure!</h4>
        </div>

        <p className="modal-label">
          Fill out the form below to create a new trip. Don't forget to give it a name!
        </p>
        <CreateNewTripForm className="modal-form" />
      </div>
    </div>
  );
};
