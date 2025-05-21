import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput.jsx";
import { createTrip } from "../../services/tripService";
import { getAllParks } from "../../services/parkService";
import { DropDown } from "../parks/DropDown.jsx";
import "./Form.css";

export const CreateNewTripForm = ({ parkId, onSuccess }) => {
  const [tripName, setTripName] = useState("");
  const [selectedParkId, setSelectedParkId] = useState(parkId ? parseInt(parkId) : "");
  const [parks, setParks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!parkId) {
      getAllParks().then(setParks);
    }
  }, [parkId]);

  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!tripName.trim()) {
      setError("Trip name is required.");
      return;
    }
    if (!parkId && !selectedParkId) {
      setError("Please select a park.");
      return;
    }
    const localUser = localStorage.getItem("parkplan_user");
    const userObj = JSON.parse(localUser);

    const newTrip = {
      name: tripName,
      userId: userObj.id,
      createdAt: new Date().toISOString(),
      parkId: parkId ? parseInt(parkId) : parseInt(selectedParkId),
    };

    createTrip(newTrip)
      .then(() => {
        setTripName("");
        setSelectedParkId("");
        setError("");
        if (onSuccess) {
          onSuccess(); // This will refresh trips and close modal in TripDashboard
        } else {
          navigate("/trips"); // Only navigate if no onSuccess (e.g., from ParkDetails)
        }
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
      {!parkId && (
        <DropDown
          options={parks}
          selectedValue={selectedParkId}
          onChange={(e) => setSelectedParkId(e.target.value)}
        />
      )}
      {error && <p className="form-error">{error}</p>}
      <button type="submit">Add Trip</button>
    </form>
  );
};
