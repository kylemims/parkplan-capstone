import { useState, useEffect } from "react";
import { getTripsByUserId, deleteTrip } from "../../services/tripService";
import { NewTripModal } from "../forms/NewTripModal.jsx";
import { TripCard } from "./TripCard.jsx";
import { EditTripModal } from "./EditTripModal.jsx"; //
import "./TripList.css";
import { useNavigate } from "react-router-dom";

const TripDashboard = () => {
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
      <h1>My Planned Trips</h1>
      <div className="icon-legend">
        <h3>Quick Actions</h3>
        <div className="legend-items">
          <div className="legend-item">
            <img src="/icons/add-activity.svg" alt="Add Activities" />
            <span>Add Activities</span>
          </div>
          <div className="legend-item">
            <img src="/icons/camper-1.svg" alt="Camping" />
            <span>Camping Options</span>
          </div>
          <div className="legend-item">
            <img src="/icons/edit.svg" alt="Edit Trip" />
            <span>Edit Trip Details</span>
          </div>
          <div className="legend-item">
            <img src="/icons/trash.svg" alt="Delete Trip" />
            <span>Delete Trip</span>
          </div>
        </div>
      </div>
      <div className="trip-list">
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
      </div>
      <div className="add-new-dash">
        <NewTripModal open={openModal} onClose={() => setOpenModal(false)} onTripCreated={refreshTrips} />

        <EditTripModal
          open={editModalOpen}
          onClose={handleEditModalClose}
          tripId={selectedTripId}
          onTripUpdated={refreshTrips}
        />
        <button className="trip-btn" onClick={() => setOpenModal(true)}>
          + Add New Trip
        </button>
      </div>
    </section>
  );
};

export default TripDashboard;
