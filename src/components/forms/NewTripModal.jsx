import { CreateNewTripForm } from "./CreateNewTripForm.jsx";
import { Modal } from "./Modal.jsx";

export const NewTripModal = ({ open, onClose, parkId, onTripCreated }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create a New Trip"
      description="Fill out the form below to create a new trip. Don't forget to give it a name!">
      <CreateNewTripForm
        parkId={parkId}
        onSuccess={() => {
          if (onTripCreated) onTripCreated();
          onClose();
        }}
      />
    </Modal>
  );
};
