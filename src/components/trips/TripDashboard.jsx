import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTripsByUserId } from "../../services/tripService";
import { deleteTrip } from "../../services/tripService";
import "./TripList.css";

// Component to display the list of trips for the logged-in user
export const TripDashboard = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const localUser = localStorage.getItem("parkplan_user");
  const userObj = JSON.parse(localUser);

  useEffect(() => {
    getTripsByUserId(userObj.id).then(setTrips);
  }, [userObj.id]);

  const handleDelete = (tripId) => {
    if (window.confirm("Are you sure you want to remove this trip?"))
      deleteTrip(tripId).then(() => {
        getTripsByUserId(userObj.id).then(setTrips);
      });
  };

  return (
    <section className="trip-list">
      <h1>My Planned Trips</h1>

      <div className="trip-list__cards">
        {trips?.map((trip) => (
          <div key={trip.id} className="trip-card">
            <h3>{trip.name}</h3>
            <p>
              <strong>Park:</strong> {trip.park?.name}
            </p>
            <p>
              <strong>Created:</strong> {new Date(trip.createdAt).toLocaleDateString()}
            </p>

            {/* Navigate to the edit form of selected trip */}
            <div className="trip-card__actions">
              <button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit</button>
              <button onClick={() => handleDelete(trip.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-new-dash">
        <button className="trip-list__create-button" onClick={() => navigate("/")}>
          + Add New Trip
        </button>
      </div>
    </section>
  );
};
