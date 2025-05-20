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

// import "./NewTripModal.css";
// import { CreateNewTripForm } from "./CreateNewTripForm.jsx";
// import { Modal } from "./Modal.jsx";

// export const NewTripModal = ({ open, onClose }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       title="Create a New Trip"
//       description="Fill out the form below to create a new trip. Don't forget to give it a name!"
//       children={<CreateNewTripForm className="modal-form" />}
//     />
//   );
// };

// export const NewTripModal = ({ open, onClose }) => {
//   if (!open) {
//     return null; // Don't render anything if the modal is not open
//   }
//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <p className="close-button" onClick={onClose}>
//           X
//         </p>
//         <div className="modal-header">
//           <h2>Create a New Trip</h2>
//         </div>

//         <p className="modal-label">
//           Fill out the form below to create a new trip. Don't forget to give it a name!
//         </p>
//         <CreateNewTripForm className="modal-form" />
//       </div>
//     </div>
//   );
// };
