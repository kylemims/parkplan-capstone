import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImagesByParkId, getParkById } from "../../services/parkService";
import { NewTripModal } from "../forms/NewTripModal.jsx";
import { ImageCarousel } from "./ImageCarousel.jsx";
import { getMonthlyWeatherAverages } from "../../services/weatherService";
import "./ParkDetails.css";
import "../forms/Form.css";

export const ParkDetails = () => {
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getParkById(parseInt(parkId)).then(setPark);
    getImagesByParkId(parseInt(parkId)).then(setImages);
  }, [parkId]);

  useEffect(() => {
    if (park?.latitude && park?.longitude) {
      getMonthlyWeatherAverages(park.latitude, park.longitude)
        .then(setWeather)
        .catch((err) => console.error("Failed to load weather", err));
    }
  }, [park]);

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
        <div className="add-trip-btn-container">
          <button className="park-deets-btn" onClick={() => setOpenModal(true)}>
            + Add Trip
          </button>
          <NewTripModal open={openModal} onClose={() => setOpenModal(false)} parkId={parkId} />
        </div>
      </section>
      <section className="park-weather-section">
        {weather?.length > 0 && (
          <div className="weather-panel">
            <h3>Average Monthly Weather</h3>
            <p>This is general climate data based on historical trends.</p>
            <ul className="weather-grid">
              {weather.slice(0, 6).map((month, i) => (
                <li key={i} className="weather-month">
                  <strong>{month.month}</strong>
                  <br />
                  🌡️ {month.temp}°F
                  <br />☔ {month.precip} in
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="add-trip-btn-container">
          <button className="park-deets-btn" onClick={() => setOpenModal(true)}>
            + Add Trip
          </button>
          <NewTripModal open={openModal} onClose={() => setOpenModal(false)} parkId={parkId} />
        </div>
      </section>
    </section>
  );
};
