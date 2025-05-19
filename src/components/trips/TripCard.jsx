// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getTripsByUserId } from "../../services/tripService";
// import { deleteTrip } from "../../services/tripService";
import "./TripList.css";
import "../forms/Form.css";

export const TripCard = ({ trip, onDelete }) => {
  // const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  // const localUser = localStorage.getItem("parkplan_user");
  // const userObj = JSON.parse(localUser);

  //  useEffect(() => {
  //   getTripsByUserId(userObj.id).then(setTrips);
  // }, [userObj.id]);

  // const handleDelete = (tripId) => {
  //   if (window.confirm("Are you sure you want to remove this trip?"))
  //     deleteTrip(tripId).then(() => {
  //       getTripsByUserId(userObj.id).then(setTrips);
  //     });
  // };

  return (
    <div
      key={trip.id}
      className="trip-card"
      style={{
        backgroundImage: `url(${trip.parkImageUrl})`,
      }}>
      <div className="trip-card__overlay">
        <div className="trip-card__header">
          <h3>{trip.name}</h3>
        </div>

        <div className="trip-card__content">
          <p className="trip-park">{trip.park?.name}</p>
          <p className="trip-date">Created: {new Date(trip.createdAt).toLocaleDateString()}</p>
          {/* Placeholder for future weather or month */}
        </div>

        <div className="trip-card__actions">
          <button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit</button>
          <button onClick={() => onDelete(trip.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
//     <div
//       key={trip.id}
//       className="trip-card"
//       style={{
//         backgroundImage: `url(${trip.parkImageUrl || "/images/fallback.jpg"})`,
//       }}>
//       <div className="trip-card__overlay">
//         <div className="trip-card__header">
//           <h3>{trip.name}</h3>
//         </div>

//         <div className="trip-card__content">
//           <p>{trip.park?.name}</p>
//           <p>Created: {new Date(trip.createdAt).toLocaleDateString()}</p>
//         </div>

//         <div className="trip-card__actions">
//           <button onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit</button>
//           <button onClick={() => onDelete(trip.id)}>Delete</button>
//         </div>
//       </div>
//     </div>
