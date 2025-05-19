import { useState } from "react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getTripsByUserId } from "../../services/tripService";
import { deleteTrip } from "../../services/tripService";
import "./TripList.css";
import { NewTripModal } from "../forms/NewTripModal.jsx";
import { CreateNewTripForm } from "../forms/CreateNewTripForm.jsx";
import "../forms/NewTripModal.css";
import "../forms/Form.css";
import { TripCard } from "./TripCard.jsx";

// Component to display the list of trips for the logged-in user
export const TripDashboard = () => {
  const [trips, setTrips] = useState([]);
  // const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
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
        <button className="trip-list__create-button" onClick={handleOpenModal}>
          + Add New Trip
        </button>
        <NewTripModal open={openModal} onClose={handleCloseModal} />
      </div>
    </section>
  );
};
