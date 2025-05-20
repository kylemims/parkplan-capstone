import { useState } from "react";
import { FormInput } from "./FormInput.jsx";
import { createTrip } from "../../services/tripService";
import "./Form.css";

export const CreateNewTripForm = ({ parkId, onSuccess }) => {
  const [tripName, setTripName] = useState("");
  const [error, setError] = useState("");

  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!tripName.trim()) {
      setError("Trip name is required.");
      return;
    }
    const localUser = localStorage.getItem("parkplan_user");
    const userObj = JSON.parse(localUser);

    const newTrip = {
      name: tripName,
      userId: userObj.id,
      createdAt: new Date().toISOString(),
      ...(parkId && { parkId: parseInt(parkId) }),
    };

    createTrip(newTrip)
      .then(() => {
        setTripName("");
        setError("");
        if (onSuccess) onSuccess();
      })
      .catch(() => setError("Failed to create trip."));
  };

  return (
    <form className="trip-form" onSubmit={handleAddTrip}>
      <FormInput
        type="text"
        name="tripName"
        id="tripName"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        placeholder="e.g. Yellowstone Adventure"
      />
      {error && <p className="form-error">{error}</p>}
      <button type="submit">Add Trip</button>
    </form>
  );
};

// import { FormInput } from "./FormInput.jsx";
// import "./Form.css";

// export const CreateNewTripForm = ({ tripName, setTripName, handleAddTrip }) => {
//   return (
//     <form
//       className="trip-form"
//       onSubmit={(e) => {
//         e.preventDefault();
//         handleAddTrip();
//       }}>
//       <FormInput
//         // label=""
//         type="text"
//         name="tripName"
//         id="tripName"
//         value={tripName}
//         onChange={(e) => setTripName(e.target.value)}
//         placeholder="e.g. Yellowstone Adventure"
//       />

//       <button type="submit">Add Trip</button>
//     </form>
//   );
// };
//  disabled={tripName.trim() === ""}
