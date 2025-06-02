import { useEffect, useState } from "react";
import { getImagesByParkId } from "../../services/parkService.js";
import { IconTooltipButton } from "../templates/IconTooltipButton.jsx";
import "./TripList.css";
import "../forms/Form.css";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
            onClick={() => navigate(`/trips/${trip.id}/details/${trip.park?.code}`)}
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
