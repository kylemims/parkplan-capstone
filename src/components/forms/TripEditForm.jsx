import { useState, useEffect } from "react";
import { FormInput } from "./FormInput.jsx";
import { getTripById, updateTrip } from "../../services/tripService.js";
import { getAllParks } from "../../services/parkService.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const TripEditForm = () => {
  const [trip, setTrip] = useState(null);
  const [parks, setParks] = useState([]);
  const navigate = useNavigate();
  const { tripId } = useParams();

  useEffect(() => {
    getTripById(tripId).then(setTrip);
    getAllParks().then(setParks);
  }, [tripId]);

  const handleChange = (e) => {
    const copy = { ...trip };
    copy[e.target.name] = e.target.value;
    setTrip(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip(trip.id, {
      ...trip,
      parkId: parseInt(trip.parkId),
    }).then(() => navigate("/trips"));
  };

  if (!trip) return <p>Loading trip...</p>;

  return (
    <form className="trip-form" onSubmit={handleSubmit}>
      <h2>Edit Trip</h2>

      <FormInput
        label="Trip Name"
        type="text"
        name="name"
        id="tripName"
        value={trip.name}
        onChange={handleChange}
        placeholder="Enter your updated trip name"
      />

      <label htmlFor="park">Select Park</label>
      <select id="park" name="parkId" value={trip.parkId} onChange={handleChange}>
        <option value="0">-- Select a Park --</option>
        {parks.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <button type="submit">Save Changes</button>
    </form>
  );
};
