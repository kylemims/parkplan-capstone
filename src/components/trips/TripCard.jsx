import { useEffect, useState } from "react";
import { getImagesByParkId } from "../../services/parkService.js";
import "./TripList.css";
import "../forms/Form.css";

export const TripCard = ({ trip, onDelete, onEdit }) => {
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
    <div className="trip-card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="trip-card__overlay">
        <div className="trip-card__header">
          <h3>{trip.name}</h3>
        </div>
        <div className="trip-card__content">
          <p className="trip-park">{trip.park?.name}</p>
          <p className="trip-date">Created: {new Date(trip.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="trip-card__actions">
          <button onClick={() => onEdit(trip.id)}>Edit</button>
          <button onClick={() => onDelete(trip.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
