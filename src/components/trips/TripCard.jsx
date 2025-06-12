import { useEffect, useState } from "react";
import { getImagesByParkId, getParkById } from "../../services/parkService.js";
import { IconTooltipButton } from "../templates/IconTooltipButton.jsx";
import "./TripList.css";
import "../forms/Form.css";
import { useNavigate } from "react-router-dom";

export const TripCard = ({ trip, onDelete, onEdit }) => {
  const [imageUrl, setImageUrl] = useState("");
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
        </div>
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
