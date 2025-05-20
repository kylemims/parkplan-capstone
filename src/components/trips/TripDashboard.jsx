import { useState, useEffect } from "react";
import { getTripsByUserId, deleteTrip } from "../../services/tripService";
import { NewTripModal } from "../forms/NewTripModal.jsx";
import { TripCard } from "./TripCard.jsx";
import "./TripList.css";

export const TripDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const localUser = localStorage.getItem("parkplan_user");
  const userObj = JSON.parse(localUser);

  useEffect(() => {
    getTripsByUserId(userObj.id).then(setTrips);
  }, [userObj.id]);

  const handleDelete = (tripId) => {
    if (window.confirm("Are you sure you want to remove this trip?"))
      deleteTrip(tripId).then(setTrips);
  };

  return (
    <section className="trip-list">
      <h1>My Planned Trips</h1>
      <div className="trip-list__cards">
        {trips?.map((trip) => (
          <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
        ))}
      </div>
      <div className="add-new-dash">
        <button className="trip-list__create-button" onClick={() => setOpenModal(true)}>
          + Add New Trip
        </button>
        <NewTripModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onTripCreated={setTrips}
        />
      </div>
    </section>
  );
};
