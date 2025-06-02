import { TripEditForm } from "../forms/TripEditForm.jsx";
import { Modal } from "../forms/Modal.jsx";

export const EditTripModal = ({ open, onClose, tripId, onTripUpdated }) => {
  return (
    <Modal
      className="edit-trip-modal"
      open={open}
      onClose={onClose}
      title="Edit Trip"
      description="Update the details of your trip below">
      <TripEditForm
        tripId={tripId}
        onSuccess={() => {
          if (onTripUpdated) onTripUpdated();
          onClose();
        }}
      />
    </Modal>
  );
};
