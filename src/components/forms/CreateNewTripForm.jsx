import { FormInput } from "./FormInput.jsx";
import "./Form.css";

export const CreateNewTripForm = ({ tripName, setTripName, handleAddTrip }) => {
  return (
    <form
      className="trip-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTrip();
      }}>
      <FormInput
        // label=""
        type="text"
        name="tripName"
        id="tripName"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        placeholder="e.g. Yellowstone Adventure"
      />

      <button type="submit">Add Trip</button>
    </form>
  );
};
//  disabled={tripName.trim() === ""}
