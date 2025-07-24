import { useState, useEffect } from "react";
import { GetNPSCampgrounds } from "../../services/parkService.js";
import { useParams } from "react-router-dom";
import { getTripItemsByTripId, createTripItem } from "../../services/itineraryService.js";
import "./CampgroundSelector.css";

export const CampgroundSelector = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const { tripId } = useParams();
  console.log("Trip ID from URL:", tripId);
  const addToItinerary = (campground) => {
    const item = {
      tripId: parseInt(tripId),
      type: "campground",
      title: campground.name,
      description: campground.description || "",
      duration: "Overnight", // Can be modified later
    };

    if (!itinerary.some((i) => i.title === item.title)) {
      createTripItem(item)
        .then(() => loadItinerary())
        .catch((err) => console.error("Failed to add campground", err));
    }
  };

  const loadItinerary = () => {
    getTripItemsByTripId(tripId)
      .then((data) => setItinerary(data))
      .catch((err) => console.error("Failed to load trip itinerary", err));
  };

  useEffect(() => {
    GetNPSCampgrounds()
      .then(setCampgrounds)
      .catch((err) => console.error("Failed to load campgrounds", err));

    loadItinerary();
  }, [tripId]);

  return (
    <section className="things-to-do-section">
      <h2>Select Campgrounds for {}</h2>
      <div className="camp-container">
        <ul className="todo-list">
          {campgrounds.data?.map((campground) => (
            <li key={campground.id} className="todo-card">
              <h3 className="todo-title">{campground.name}</h3>
              <p>{campground.description}</p>
              <p>
                <strong>Reservation Info:</strong> {campground.reservationInfo}
              </p>
              <p>
                <strong>Weather:</strong> {campground.weatherOverview}
              </p>
              <p>
                <strong>Open Year-Round:</strong> {campground.openYearRound ? "Yes" : "No"}
              </p>
              <button onClick={() => addToItinerary(campground)} className="add-to-itinerary-btn">
                Add to Trip
              </button>
            </li>
          ))}
        </ul>
      </div>
      <section className="itinerary-review">
        <h2>Your Trip Itinerary</h2>

        {itinerary.length === 0 ? (
          <p>No activities added yet.</p>
        ) : (
          <>
            <ul>
              {itinerary
                .filter((item) => item.type === "campground")
                .map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong> – {item.duration}
                  </li>
                ))}
            </ul>

            {/* Removed total duration for simplicity */}
          </>
        )}
      </section>
    </section>
  );
};
