import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetNPSCampgrounds } from "../../services/parkService.js";
import { getTripItemsByTripId, createTripItem } from "../../services/itineraryService.js";
import { getTripById } from "../../services/tripService.js";
import { getParkById } from "../../services/parkService.js";
import "./CampgroundSelector.css";

export const CampgroundSelector = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [trip, setTrip] = useState(null);
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const addToItinerary = (campground) => {
    const item = {
      tripId: parseInt(tripId),
      type: "campground",
      title: campground.name,
      description: truncateText(campground.description, 100),
      duration: "Overnight",
      campgroundData: {
        reservationUrl: campground.reservationUrl,
        fees: campground.fees,
        amenities: campground.amenities,
        totalSites: campground.campsites?.totalSites || "N/A",
      },
    };

    if (!itinerary.some((i) => i.title === item.title)) {
      createTripItem(item)
        .then(() => {
          loadItinerary();
          // Show success feedback
          const button = document.querySelector(`[data-campground="${campground.id}"]`);
          if (button) {
            button.textContent = "✓ Added!";
            button.style.backgroundColor = "#5a786f";
            setTimeout(() => {
              button.textContent = "Add to Trip";
              button.style.backgroundColor = "";
            }, 2000);
          }
        })
        .catch((err) => console.error("Failed to add campground", err));
    }
  };

  const loadItinerary = () => {
    getTripItemsByTripId(tripId)
      .then((data) => setItinerary(data))
      .catch((err) => console.error("Failed to load trip itinerary", err));
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const formatFee = (fee) => {
    return `$${fee.cost} - ${fee.title}`;
  };

  const getKeyAmenities = (amenities) => {
    const key = [];
    if (amenities?.toilets && amenities.toilets[0] !== "None") key.push("🚻 Toilets");
    if (amenities?.showers && amenities.showers[0] !== "None") key.push("🚿 Showers");
    if (amenities?.potableWater && amenities.potableWater[0] !== "No") key.push("💧 Water");
    if (amenities?.foodStorageLockers === "Yes - seasonal" || amenities?.foodStorageLockers === "Yes")
      key.push("🔒 Food Storage");
    return key.slice(0, 4); // Limit to 4 key amenities
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load trip and park info
        const tripData = await getTripById(tripId);
        setTrip(tripData);

        const parkData = await getParkById(tripData.parkId);
        setPark(parkData);

        // Load campgrounds and itinerary
        const [campgroundsData] = await Promise.all([GetNPSCampgrounds(), loadItinerary()]);

        setCampgrounds(campgroundsData.data || []);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      loadData();
    }
  }, [tripId]);

  if (loading) {
    return (
      <div className="campground-loading">
        <div className="loading-spinner"></div>
        <p>Loading campgrounds...</p>
      </div>
    );
  }

  const campgroundsInItinerary = itinerary.filter((item) => item.type === "campground");

  return (
    <section className="campground-selector">
      <div className="campground-header">
        <button className="back-button" onClick={() => navigate(`/trips/${tripId}/summary`)}>
          ← Back to Trip
        </button>
        <div className="header-info">
          <h1>Choose Your Campground</h1>
          <p>
            {trip?.name} • {park?.name}
          </p>
        </div>
      </div>

      <div className="campground-content">
        <div className="campground-grid">
          {campgrounds?.map((campground) => (
            <div
              key={campground.id}
              className={`campground-card ${expandedCard === campground.id ? "expanded" : ""}`}>
              {/* Card Header */}
              <div className="campground-card-header">
                <h3>{campground.name}</h3>
                <div className="campground-meta">
                  <span className="sites-count">{campground.campsites?.totalSites || "N/A"} sites</span>
                  {campground.fees && campground.fees[0] && (
                    <span className="fee-info">${campground.fees[0].cost}/night</span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="campground-card-body">
                <p className="campground-description">{truncateText(campground.description, 120)}</p>

                {/* Key Amenities */}
                <div className="amenities-quick">
                  {getKeyAmenities(campground.amenities).map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Reservation Status */}
                {campground.reservationInfo && (
                  <div className="reservation-status">
                    <span className="status-icon">📅</span>
                    <span className="status-text">
                      {campground.numberOfSitesReservable > 0
                        ? "Reservations Required"
                        : "First Come, First Served"}
                    </span>
                  </div>
                )}
              </div>

              {/* Expanded Content */}
              {expandedCard === campground.id && (
                <div className="campground-details">
                  <div className="details-grid">
                    <div className="detail-section">
                      <h5>Fees</h5>
                      <ul>
                        {campground.fees?.slice(0, 2).map((fee, index) => (
                          <li key={index}>{formatFee(fee)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h5>Accessibility</h5>
                      <p>{campground.accessibility?.rvAllowed === "1" ? "RV Friendly" : "Tents Only"}</p>
                      {campground.accessibility?.rvMaxLength && (
                        <p>Max RV: {campground.accessibility.rvMaxLength}ft</p>
                      )}
                    </div>
                  </div>

                  {campground.reservationUrl && (
                    <a
                      href={campground.reservationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reservation-link">
                      Make Reservation →
                    </a>
                  )}
                </div>
              )}

              {/* Card Actions */}
              <div className="campground-actions">
                <button
                  onClick={() => setExpandedCard(expandedCard === campground.id ? null : campground.id)}
                  className="details-btn">
                  {expandedCard === campground.id ? "Less Details" : "More Details"}
                </button>

                <button
                  onClick={() => addToItinerary(campground)}
                  className="add-campground-btn"
                  data-campground={campground.id}
                  disabled={itinerary.some((i) => i.title === campground.name)}>
                  {itinerary.some((i) => i.title === campground.name) ? "✓ Added" : "Add to Trip"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Itinerary Sidebar */}
        <div className="itinerary-sidebar">
          <div className="itinerary-header">
            <h3>Selected Campgrounds</h3>
            <span className="count-badge">{campgroundsInItinerary.length}</span>
          </div>

          {campgroundsInItinerary.length === 0 ? (
            <div className="empty-itinerary">
              <p>No campgrounds selected yet</p>
              <span className="empty-icon">🏕️</span>
            </div>
          ) : (
            <ul className="itinerary-list">
              {campgroundsInItinerary.map((item) => (
                <li key={item.id} className="itinerary-item">
                  <strong>{item.title}</strong>
                  <span className="duration">{item.duration}</span>
                </li>
              ))}
            </ul>
          )}

          <button className="view-full-itinerary" onClick={() => navigate(`/trips/${tripId}/summary`)}>
            View Full Trip Summary
          </button>
        </div>
      </div>
    </section>
  );
};
