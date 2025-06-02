import { useState, useEffect } from "react";
import { getTripsByUserId, deleteTrip } from "../../services/tripService";
import { NewTripModal } from "../forms/NewTripModal.jsx";
import { TripCard } from "./TripCard.jsx";
import { EditTripModal } from "./EditTripModal.jsx"; //
import "./TripList.css";
import { useNavigate } from "react-router-dom";

export const TripDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const localUser = localStorage.getItem("parkplan_user");
  const userObj = JSON.parse(localUser);
  const navigate = useNavigate();

  useEffect(() => {
    getTripsByUserId(userObj.id).then(setTrips);
  }, [userObj.id]);

  const handleEdit = (tripId) => {
    setSelectedTripId(tripId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedTripId(null);
  };
  const refreshTrips = () => {
    getTripsByUserId(userObj.id).then(setTrips);
  };
  const handleDelete = (tripId) => {
    if (window.confirm("Are you sure you want to remove this trip?")) {
      deleteTrip(tripId).then(() => {
        getTripsByUserId(userObj.id).then(setTrips);
        navigate("/trips");
      });
    }
  };

  return (
    <section className="trip-dashboard-container">
      <div className="trip-list">
        <h1>My Planned Trips</h1>
        <div className="trip-list__cards">
          {trips?.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={handleDelete}
              onEdit={handleEdit} //
            />
          ))}
        </div>
        <div className="add-new-dash">
          <button className="trip-btn" onClick={() => setOpenModal(true)}>
            + Add New Trip
          </button>
          <NewTripModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onTripCreated={refreshTrips}
          />
        </div>
        <EditTripModal
          open={editModalOpen}
          onClose={handleEditModalClose}
          tripId={selectedTripId}
          onTripUpdated={refreshTrips}
        />
      </div>
    </section>
  );
};
