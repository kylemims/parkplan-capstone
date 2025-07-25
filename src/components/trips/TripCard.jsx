import { useEffect, useState } from "react";
import { getTripItemsByTripId } from "../../services/itineraryService";
import { getImagesByParkId, getParkById } from "../../services/parkService.js";
import { IconTooltipButton } from "../templates/IconTooltipButton.jsx";
import "./TripList.css";
import "../forms/Form.css";
import { useNavigate } from "react-router-dom";

export const TripCard = ({ trip, onDelete, onEdit }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [tripItems, setTripItems] = useState([]);
  const [park, setPark] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const parkId = trip.park?.id || trip.parkId;
    if (parkId) {
      getImagesByParkId(parkId).then((images) => {
        if (images && images.length > 0) {
          setImageUrl(images[0].url);
        }
      });
      if (!trip.park) {
        getParkById(parkId).then(setPark);
      }
    }
  }, [trip.park?.id, trip.parkId, trip.park]);

  useEffect(() => {
    getTripItemsByTripId(trip.id)
      .then((items) => setTripItems(items))
      .catch((err) => console.error("Failed to load trip items", err));
  }, [trip.id]);

  const parkObj = trip.park || park;

  return (
    <div className="trip-card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="trip-card__overlay">
        <div className="trip-card__content">
          <div className="trip-card__header">
            <h3>{trip.name}</h3>
          </div>
          <p className="trip-park">{parkObj?.name}</p>
          <p className="trip-date">Created: {new Date(trip.createdAt).toLocaleDateString()}</p>

          {tripItems.length > 0 && (
            <div className="trip-preview">
              <p className="trip-preview-label">Itinerary Preview:</p>
              <ul className="trip-preview-list">
                {tripItems.slice(0, 2).map((item) => (
                  <li key={item.id}>
                    <span>{item.type === "campground" ? "🏕️" : "🎯"}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
                {tripItems.length > 2 && (
                  <li>
                    <span>📝</span>
                    <span>+{tripItems.length - 2} more items</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="trip-card__actions">
          <button
            className="trip-summary-btn full-width"
            onClick={() => navigate(`/trips/${trip.id}/summary`)}>
            View Trip Summary
          </button>
        </div>

        <div className="trip-card__side-tab">
          <IconTooltipButton
            iconSrc="/icons/add-activity.svg"
            tooltipContent="Add Activities"
            onClick={() => navigate(`/trips/${trip.id}/details/${parkObj?.code}`)}
          />
          <IconTooltipButton
            iconSrc="/icons/camper-1.svg"
            tooltipContent="Add Camping"
            onClick={() => navigate(`/trips/${trip.id}/campgrounds`)}
          />
          <IconTooltipButton
            iconSrc="/icons/edit.svg"
            tooltipContent="Edit Trip"
            onClick={() => onEdit(trip.id)}
          />
          <IconTooltipButton
            iconSrc="/icons/trash.svg"
            tooltipContent="Delete Trip"
            onClick={() => onDelete(trip.id)}
          />
        </div>
      </div>
    </div>
  );
};
