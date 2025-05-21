import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormInput } from "./FormInput.jsx";
import { getTripById, updateTrip } from "../../services/tripService.js";
import { getAllParks } from "../../services/parkService.js";
import { DropDown } from "../parks/DropDown.jsx";

export const TripEditForm = ({ tripId: propTripId, onSuccess }) => {
  const [trip, setTrip] = useState(null);
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const { tripId: paramTripId } = useParams();

  // Use prop if provided, otherwise fallback to route param
  const tripId = propTripId ?? paramTripId;

  useEffect(() => {
    let isMounted = true;
    if (!tripId) return;
    Promise.all([getTripById(tripId), getAllParks()]).then(([tripData, parksData]) => {
      if (isMounted) {
        setTrip(tripData);
        setParks(parksData);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trip) return;
    updateTrip(tripId, {
      ...trip,
      parkId: parseInt(trip.parkId),
    }).then(() => {
      if (onSuccess) onSuccess();
      // navigate("/trips");
    });
  };

  if (loading || !trip) return <p>Loading trip...</p>;

  return (
    <form className="edit-trip-form" onSubmit={handleSubmit}>
      <FormInput
        label="Trip Name"
        type="text"
        name="name"
        id="tripName"
        value={trip.name || ""}
        onChange={handleChange}
        placeholder="Enter your updated trip name"
      />
      <div className="edit-dropdown">
        <DropDown
          options={parks}
          selectedValue={trip.parkId || ""}
          onChange={(e) =>
            setTrip((prev) => ({
              ...prev,
              parkId: e.target.value,
            }))
          }
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};
