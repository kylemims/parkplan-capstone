import { TripEditForm } from "../forms/TripEditForm.jsx";
import { Modal } from "../forms/Modal.jsx";

export const EditTripModal = ({ open, onClose, tripId, onTripUpdated }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Trip"
      description="Update the details of your trip below.">
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

// import { TripEditForm } from "../forms/TripEditForm.jsx";
// import { Modal } from "../forms/Modal.jsx";

// export const EditTripModal = ({ open, onClose, tripId, onTripUpdated }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       title="Edit Trip"
//       description="Update the details of your trip below.">
//       <TripEditForm
//         tripId={tripId}
//         onSuccess={() => {
//           if (onTripUpdated) onTripUpdated();
//           onClose();
//         }}
//       />
//     </Modal>
//   );
// };
// This component is responsible for rendering a modal that allows users to edit the details of a trip.
// It uses the TripEditForm component to handle the form submission and updates the trip details.
// The modal can be opened or closed based on the `open` prop, and it also accepts a callback function `onTripUpdated`
