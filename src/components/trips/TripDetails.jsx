import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getThingsToDoByParkCode } from "../../services/npsService.js";
import { HoverReveal } from "../forms/HoverReveal.jsx";
import { getTripItemsByTripId, createTripItem } from "../../services/itineraryService.js";
import "./TripDetails.css";

export const TripDetails = () => {
  const { tripId, parkCode } = useParams();
  const [thingsToDo, setThingsToDo] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  const addToItinerary = (item) => {
    const tripItem = {
      tripId: parseInt(tripId),
      type: "activity",
      title: item.title,
      description: item.shortDescription || "",
      duration: item.durationDescription || "Unspecified",
    };

    // Optional: check for duplicates client-side
    if (!itinerary.some((i) => i.title === tripItem.title)) {
      createTripItem(tripItem)
        .then(() => loadItinerary())
        .catch((err) => console.error("Failed to save trip item", err));
    }
  };

  const loadItinerary = () => {
    getTripItemsByTripId(tripId)
      .then((data) => setItinerary(data))
      .catch((err) => console.error("Failed to load itinerary", err));
  };

  useEffect(() => {
    getThingsToDoByParkCode(parkCode)
      .then((data) => setThingsToDo(data.data))
      .catch((err) => console.error("Failed to load activities", err));

    loadItinerary();
  }, [parkCode, tripId]);

  return (
    <section className="things-to-do-section">
      <h2>Things To Do</h2>
      <ul className="todo-list">
        {thingsToDo?.map((item) => (
          <li key={item.id} className="todo-card">
            <h3 className="todo-title">{item.title}</h3>
            <div
              className="todo-description"
              dangerouslySetInnerHTML={{ __html: item.shortDescription }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button onClick={() => addToItinerary(item)} className="add-to-itinerary-btn">
                Add to Trip
              </button>
              <HoverReveal
                revealContent={
                  <div className="hover-reveal__content">
                    <h4 className="hover-title">{item.title}</h4>
                    {item.duration && (
                      <p>
                        <strong>Duration:</strong> {item.duration} hr(s)
                      </p>
                    )}
                    {item.durationDescription && (
                      <p>
                        <strong>Description:</strong> {item.durationDescription}
                      </p>
                    )}
                    {item.longitude && (
                      <p>
                        <strong>Longitude:</strong> {item.longitude}
                      </p>
                    )}
                  </div>
                }>
                <button className="icon-button">
                  <img src="/images/timer-icon.svg" alt="Time" className="hiker-icon" />
                </button>
              </HoverReveal>
            </div>
          </li>
        ))}
      </ul>
      <section className="itinerary-review">
        <h2>Your Trip Itinerary</h2>

        {itinerary.length === 0 ? (
          <p>No activities added yet.</p>
        ) : (
          <>
            <ul>
              {itinerary.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  {item.type === "activity" && <>: {item.duration || "N/A"}</>}
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

{
  /* <h3>Activities</h3>
<ul>
  {itinerary.filter(i => i.type === "activity").map(...)}
</ul>

<h3>Campgrounds</h3>
<ul>
  {itinerary.filter(i => i.type === "campground").map(...)}
</ul> */
}
