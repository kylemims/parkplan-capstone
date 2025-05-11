import { createTrip } from "../../services/tripService.js";
import { getAllParks } from "../../services/parkService.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../forms/FormInput.jsx";
import "./TripForm.css";

// BUILD A FORM W/ trip name + form w/ park dropdown

//? get the logged in user from local storage
const localUser = localStorage.getItem("parkplan_user");
const userObject = JSON.parse(localUser);

//? Create a new trip w/ logged in user
export const TripForm = () => {
  const [trip, setTrip] = useState({
    name: "",
    park_id: 0,
  });

  useEffect(() => {
    getAllParks().then(setParks);
  }, []);

  //? Navigate back to the Trip List after submit
  const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();

    //? Add created_at timestamp
    const newTrip = {
      name: trip.name,
      park_id: parseInt(trip.park_id),
      user_id: userObject.id,
      created_at: new Date().toISOString(),
    };
    createTrip(newTrip).then(() => {
      navigate("/");
    });
  };

  return (
    <form className="trip-form" onSubmit={handlesubmit}>
      <h2>New Trip</h2>

      <fieldset>
        <FormInput
          label="Trip Name"
          type="text"
          id="name"
          placeholder="Enter your trip name"
          value={trip.name}
          onChange={(e) => setTrip({ ...trip, name: e.target.value })}
        />
      </fieldset>

      <fieldset>
        <select
          value={trip.park_id}
          onChange={(e) => setTrip({ ...trip, park_id: parseInt(e.target.value) })}>
          <option value="0">Select a Park</option>
          {parks.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </fieldset>

      <button type="submit" disabled={trip.park_id === 0}>
        Save Trip
      </button>
    </form>
  );
};
