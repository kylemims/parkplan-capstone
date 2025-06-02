import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImagesByParkId, getParkById } from "../../services/parkService";
import { NewTripModal } from "../forms/NewTripModal.jsx";
import { ImageCarousel } from "./ImageCarousel.jsx";
import "./ParkDetails.css";
import "../forms/Form.css";

export const ParkDetails = () => {
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getParkById(parseInt(parkId)).then(setPark);
    getImagesByParkId(parseInt(parkId)).then(setImages);
  }, [parkId]);

  if (!park) return <p>Loading park details...</p>;

  return (
    <section className="park-details-container">
      <h1 className="park-deets-header">{park.name}</h1>
      <p className="park-location">{park.location}</p>
      <ImageCarousel images={images} parkName={park.name} />
      <p className="park-tagline">{park.description}</p>

      <section className="unparked-section">
        <div className="special-block">
          <div className="icon-block">
            <img src="/images/weather-icon.svg" alt="Weather Icon" className="park-icon" />
          </div>
          <div className="bold-block">
            <h5>Best weather:</h5>
          </div>
          <div className="text-block">
            <p className="best-time">{park.bestTime}</p>
          </div>
        </div>
        <div className="special-block">
          <div className="icon-block">
            <img src="/images/wildlife-icon.svg" alt="Wildlife Icon" className="park-icon" />
          </div>
          <div className="bold-block">
            <h5>Wildlife:</h5>
          </div>
          <div className="text-block">
            <p className="best-time">{park.wildlife}</p>
          </div>
        </div>
        <div className="special-block">
          <div className="icon-block">
            <img src="/images/highlight-icon.svg" alt="Highlight Icon" className="park-icon" />
          </div>
          <div className="bold-block">
            <h5>Highlights:</h5>
          </div>
          <div className="text-block">
            <p className="best-time">{park.highlights}</p>
          </div>
        </div>
      </section>

      <div className="add-trip-btn-container">
        <button className="park-deets-btn" onClick={() => setOpenModal(true)}>
          + Add Trip
        </button>
        <NewTripModal open={openModal} onClose={() => setOpenModal(false)} parkId={parkId} />
      </div>
    </section>
  );
};
