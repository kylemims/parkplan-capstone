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
        <div className="trip-card__header">
          <h3>{trip.name}</h3>
        </div>
        <div className="trip-card__content">
          <p className="trip-park">{trip.park?.name}</p>
          <p className="trip-date">Created: {new Date(trip.createdAt).toLocaleDateString()}</p>
          {tripItems.length > 0 && (
            <div className="trip-preview">
              <p className="trip-preview-label">Itinerary:</p>
              <ul className="trip-preview-list">
                {tripItems.slice(0, 2).map((item) => (
                  <li key={item.id}>
                    {item.type === "campground" ? "🏕️" : "🎯"} {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className="trip-summary-btn" onClick={() => navigate(`/trips/${trip.id}/summary`)}>
          View Trip Summary
        </button>
        <button className="view-camp-btn" onClick={() => navigate(`/trips/${trip.id}/campgrounds`)}>
          View Campgrounds
        </button>
        <div className="trip-card__side-tab">
          <IconTooltipButton
            iconSrc="/images/add-icon.svg"
            tooltipContent={"Add Activities"}
            onClick={() => navigate(`/trips/${trip.id}/details/${parkObj?.code}`)}
          />
          <IconTooltipButton
            iconSrc="/images/edit-icon.svg"
            tooltipContent={"Edit this Trip"}
            onClick={() => onEdit(trip.id)}
          />
          <IconTooltipButton
            iconSrc="/images/delete-icon.svg"
            tooltipContent={"Delete this Trip"}
            onClick={() => onDelete(trip.id)}
          />
        </div>
      </div>
    </div>
  );
};
