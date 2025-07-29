import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTripById } from "../../services/tripService";
import { getTripItemsByTripId } from "../../services/itineraryService";
import { getImagesByParkId, getParkById } from "../../services/parkService";
import { getMonthlyWeatherAverages } from "../../services/weatherService";
import "./TripSummary.css";

export const TripSummary = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [tripItems, setTripItems] = useState([]);
  const [weather, setWeather] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [park, setPark] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTripById(tripId).then((tripObj) => {
      setTrip(tripObj);
      getParkById(tripObj.parkId).then(setPark);
      getImagesByParkId(tripObj.parkId).then((imgs) => {
        if (imgs?.length > 0) setImageUrl(imgs[0].url);
      });
    });

    getTripItemsByTripId(tripId).then(setTripItems);
  }, [tripId]);
  useEffect(() => {
    if (park?.latitude && park?.longitude) {
      getMonthlyWeatherAverages(park.latitude, park.longitude)
        .then((data) => {
          console.log("Weather data:", data);
          setWeather(data);
        })
        .catch((err) => console.error("Failed to load weather", err));
    }
  }, [park]);
  if (!trip || !park) return <p>Loading trip summary...</p>;

  const activities = tripItems.filter((item) => item.type === "activity");
  const campgrounds = tripItems.filter((item) => item.type === "campground");
  const highlightSeason = (monthAbbr) => {
    const spring = ["Mar", "Apr", "May"];
    const summer = ["Jun", "Jul", "Aug"];
    const fall = ["Sep", "Oct", "Nov"];
    const winter = ["Dec", "Jan", "Feb"];

    if (spring.includes(monthAbbr)) return "🌸";
    if (summer.includes(monthAbbr)) return "☀️";
    if (fall.includes(monthAbbr)) return "🍂";
    if (winter.includes(monthAbbr)) return "❄️";
    return "";
  };

  return (
    <section className="trip-summary">
      <h1>{trip.name}</h1>
      <h2>{park.name}</h2>
      <p className="summary-date">Created: {new Date(trip.createdAt).toLocaleDateString()}</p>
      {imageUrl && <img src={imageUrl} alt={park.name} className="summary-hero" />}{" "}
      <div className="summary-controls">
        <button className="summary-btn" onClick={() => window.print()}>
          🖨️ Print / Save PDF
        </button>

        <button
          className="summary-btn"
          onClick={() => {
            const subject = encodeURIComponent(`My Trip to ${park.name}`);
            const body = encodeURIComponent(
              `Check out my trip itinerary for ${trip.name} in ${
                park.name
              }!\n\nTrip Summary:\n- Created: ${new Date(trip.createdAt).toLocaleDateString()}\n- ${
                tripItems.length
              } total items\n\nView in Pick A Park.`
            );
            window.open(`mailto:?subject=${subject}&body=${body}`);
          }}>
          📧 Share via Email
        </button>
        <button className="summary-btn" onClick={() => navigate("/trips")}>
          ⬅️ Back to Dashboard
        </button>
      </div>
      {activities.length > 0 && (
        <>
          <h3>Activities</h3>
          <ul>
            {activities?.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> – {item.duration}
              </li>
            ))}
          </ul>
        </>
      )}
      {campgrounds.length > 0 && (
        <>
          <h3>Campgrounds</h3>
          <ul>
            {campgrounds.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> –{" "}
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    `${item.title} ${park.name}`
                  )}`}
                  target="_blank"
                  rel="noreferrer">
                  View in Google Maps
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      {weather?.length > 0 && (
        <div className="weather-preview">
          <h3>Average Weather (Monthly)</h3>
          <p>This is a general climate preview for {park.name}.</p>
          <ul>
            {weather.slice(0, 3).map((month, i) => (
              <li key={i}>
                📆 {month.month} {highlightSeason(month.month)} — 🌡️ {month.temp}°F, ☔ {month.precip} in
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
