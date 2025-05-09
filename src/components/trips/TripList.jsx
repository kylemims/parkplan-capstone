// build out the main page a user visits when they log in.
// Make the button and message big, inviting, and easy to read.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTripsByUserId } from "../../services/tripService";
import { deleteTrip } from "../../services/tripService";
import "./TripList.css";

export const TripList = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const localUser = localStorage.getItem("parkplan_user");
  const userObj = JSON.parse(localUser);

  useEffect(() => {
    getTripsByUserId(userObj.id).then(setTrips);
  }, [userObj.id]);

  const handleDelete = (tripId) => {
    deleteTrip(tripId).then(() => {
      getTripsByUserId(userObj.id).then(setTrips);
    });
  };

  return (
    <section className="trip-list">
      <h1>Welcome to Pick A Park 🌲</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Ready to plan your next adventure?</p>

      <button onClick={() => navigate("/trips/create")} className="trip-list__create-button">
        + Start a New Trip
      </button>

      <ul className="trip-list__items">
        {trips.length === 0 ? (
          <p style={{ marginTop: "2rem", color: "#aaa" }}>You haven’t planned any trips yet.</p>
        ) : (
          trips.map((trip) => (
            <li key={trip.id} className="trip-item">
              <h3>{trip.name}</h3>
              <p>
                <strong>Park:</strong> {trip.park?.name}
              </p>
              <p>
                <strong>Created:</strong> {new Date(trip.created_at).toLocaleDateString()}
              </p>

              <button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit</button>
              <button onClick={() => handleDelete(trip.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};
