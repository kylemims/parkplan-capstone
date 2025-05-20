import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImagesByParkId } from "../../services/parkService.js";
import "./TripList.css";
import "../forms/Form.css";

export const TripCard = ({ trip, onDelete }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (trip.park?.id) {
      getImagesByParkId(trip.park.id).then((images) => {
        if (images && images.length > 0) {
          setImageUrl(images[0].url);
        }
      });
    }
  }, [trip.park?.id]);

  return (
    <div
      className="trip-card"
      style={{
        backgroundImage: `url(${imageUrl})`,
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
