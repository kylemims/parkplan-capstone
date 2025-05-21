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
      <h1>{park.name}</h1>
      <p className="park-location">{park.location}</p>
      <ImageCarousel images={images} parkName={park.name} />
      <p className="park-tagline">{park.description}</p>

      <section className="unparked-section">
        <div className="weather-header">
          <img src="/images/weather-icon.svg" alt="Weather Icon" className="weather-icon" />
          <h5>Best weather:</h5>
          <p className="best-time">{park.bestTime}</p>
        </div>

        <div className="wildlife-header">
          <img src="/images/wildlife-icon.svg" alt="Wildlife Icon" className="wildlife-icon" />
          <h5>Wildlife:</h5>
          <p className="best-time">{park.wildlife}</p>
        </div>
        <div className="highlight-header">
          <img src="/images/highlight-icon.svg" alt="Highlight Icon" className="highlight-icon" />
          <h5>Highlights</h5>
          <p className="best-time">{park.highlights}</p>
        </div>
      </section>

      <div className="trip-form-section">
        <button className="add-trip-button" onClick={() => setOpenModal(true)}>
          + Add Trip
        </button>
        <NewTripModal open={openModal} onClose={() => setOpenModal(false)} parkId={parkId} />
      </div>
    </section>
  );
};
