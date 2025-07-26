import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThingsToDoByParkCode } from "../../services/npsService.js";
import { getTripItemsByTripId, createTripItem } from "../../services/itineraryService.js";
import { getTripById } from "../../services/tripService.js";
import { getParkById } from "../../services/parkService.js";
import "./TripDetails.css";

export const TripDetails = () => {
  const { tripId, parkCode } = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [trip, setTrip] = useState(null);
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const addToItinerary = (activity) => {
    const tripItem = {
      tripId: parseInt(tripId),
      type: "activity",
      title: activity.title,
      description: stripHtml(activity.shortDescription) || "",
      duration: extractDuration(activity.duration) || "Varies",
      activityData: {
        location: activity.location,
        fees: activity.doFeesApply === "true" ? activity.feeDescription : "Free",
        reservationRequired: activity.isReservationRequired === "true",
        petFriendly: activity.arePetsPermitted === "true",
        accessibility: activity.accessibilityInformation ? "Accessible" : "Check on-site",
        seasons: activity.season || [],
        timeOfDay: activity.timeOfDay || [],
      },
    };

    if (!itinerary.some((i) => i.title === tripItem.title)) {
      createTripItem(tripItem)
        .then(() => {
          loadItinerary();
          // Success feedback
          const button = document.querySelector(`[data-activity="${activity.id}"]`);
          if (button) {
            button.textContent = "✓ Added!";
            button.style.backgroundColor = "#5a786f";
            setTimeout(() => {
              button.textContent = "Add to Trip";
              button.style.backgroundColor = "";
            }, 2000);
          }
        })
        .catch((err) => console.error("Failed to add activity", err));
    }
  };

  const loadItinerary = () => {
    getTripItemsByTripId(tripId)
      .then((data) => setItinerary(data))
      .catch((err) => console.error("Failed to load itinerary", err));
  };

  const stripHtml = (html) => {
    if (!html) return "";
    // regex pattern to remove HTML tags and return plain text '(<[^>]*>)'
    return html.replace(/<[^>]*>/g, "");
  };

  const extractDuration = (durationStr) => {
    if (!durationStr) return null;
    const match = durationStr.match(/(\d+)\s*[-–]\s*(\d+)\s*(minute|hour|day)/i);
    if (match) {
      return `${match[1]}-${match[2]} ${match[3]}${match[2] > 1 ? "s" : ""}`;
    }
    return durationStr;
  };

  const getActivityType = (activity) => {
    const tags = activity.tags || [];
    const topics = activity.topics || [];

    if (tags.some((tag) => tag.toLowerCase().includes("ranger"))) return "ranger-program";
    if (tags.some((tag) => tag.toLowerCase().includes("trail") || tag.toLowerCase().includes("hik")))
      return "hiking";
    if (
      topics.some(
        (topic) => topic.name.toLowerCase().includes("museum") || topic.name.toLowerCase().includes("exhibit")
      )
    )
      return "museum";
    if (tags.some((tag) => tag.toLowerCase().includes("tour"))) return "tour";
    return "general";
  };

  const getActivityTypeLabel = (type) => {
    const labels = {
      "ranger-program": "🎯 Ranger Program",
      hiking: "🥾 Hiking/Trail",
      museum: "🏛️ Museum/Exhibit",
      tour: "🚌 Tour",
      general: "📍 Activity",
    };
    return labels[type] || labels.general;
  };

  const getActivityIcon = (activity) => {
    const type = getActivityType(activity);
    if (activity.arePetsPermitted === "true") return "🐕";
    if (activity.isReservationRequired === "true") return "📅";
    if (activity.doFeesApply === "true") return "💰";
    return type === "hiking" ? "🥾" : type === "ranger-program" ? "🎯" : "📍";
  };

  const filteredAndSortedActivities = activities
    .filter((activity) => {
      if (filterBy === "all") return true;
      if (filterBy === "free") return activity.doFeesApply !== "true";
      if (filterBy === "pet-friendly") return activity.arePetsPermitted === "true";
      if (filterBy === "no-reservation") return activity.isReservationRequired !== "true";
      return getActivityType(activity) === filterBy;
    })
    .sort((a, b) => {
      if (sortBy === "relevance") return b.relevanceScore - a.relevanceScore;
      if (sortBy === "duration") {
        const aDur = extractDuration(a.duration) || "";
        const bDur = extractDuration(b.duration) || "";
        return aDur.localeCompare(bDur);
      }
      return a.title.localeCompare(b.title);
    });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load trip and park info
        const tripData = await getTripById(tripId);
        setTrip(tripData);

        const parkData = await getParkById(tripData.parkId);
        setPark(parkData);

        // Load activities and itinerary
        const [activitiesData] = await Promise.all([getThingsToDoByParkCode(parkCode), loadItinerary()]);

        setActivities(activitiesData.data || []);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId && parkCode) {
      loadData();
    }
  }, [tripId, parkCode]);

  if (loading) {
    return (
      <div className="activities-loading">
        <div className="loading-spinner"></div>
        <p>Loading activities...</p>
      </div>
    );
  }

  const activitiesInItinerary = itinerary.filter((item) => item.type === "activity");

  return (
    <section className="trip-details">
      {/* Header */}
      <div className="activities-header">
        <button className="back-button" onClick={() => navigate(`/trips/${tripId}/summary`)}>
          ← Back to Trip
        </button>
        <div className="header-info">
          <h1>Choose Your Activities</h1>
          <p>
            {trip?.name} • {park?.name}
          </p>
        </div>
      </div>

      <div className="activities-content">
        {/* Controls */}
        <div className="activities-controls">
          <div className="filter-group">
            <label htmlFor="filter-select">Filter by:</label>
            <select
              id="filter-select"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="control-select">
              <option value="all">All Activities</option>
              <option value="ranger-program">Ranger Programs</option>
              <option value="hiking">Hiking/Trails</option>
              <option value="museum">Museums/Exhibits</option>
              <option value="free">Free Activities</option>
              <option value="pet-friendly">Pet Friendly</option>
              <option value="no-reservation">No Reservation Needed</option>
            </select>
          </div>

          <div className="sort-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="control-select">
              <option value="relevance">Relevance</option>
              <option value="title">Name A-Z</option>
              <option value="duration">Duration</option>
            </select>
          </div>

          <div className="results-count">{filteredAndSortedActivities.length} activities found</div>
        </div>

        <div className="activities-layout">
          {/* Activities Grid */}
          <div className="activities-grid">
            {filteredAndSortedActivities.length === 0 ? (
              <div className="no-activities">
                <h3>No activities match your filters</h3>
                <p>Try adjusting your filter settings above.</p>
              </div>
            ) : (
              filteredAndSortedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`activity-card ${expandedActivity === activity.id ? "expanded" : ""}`}>
                  {/* Card Header */}
                  <div className="activity-card-header">
                    <div className="activity-meta">
                      <span className="activity-type">{getActivityTypeLabel(getActivityType(activity))}</span>
                      <span className="activity-icon">{getActivityIcon(activity)}</span>
                    </div>
                    <h3>{activity.title}</h3>
                    {activity.duration && (
                      <div className="duration-badge">{extractDuration(activity.duration)}</div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="activity-card-body">
                    <p className="activity-description">
                      {stripHtml(activity.shortDescription).substring(0, 180)}...
                    </p>

                    {/* Quick Info Tags */}
                    <div className="activity-tags">
                      {activity.location && <span className="info-tag location">📍 {activity.location}</span>}
                      {activity.doFeesApply === "true" ? (
                        <span className="info-tag fee">💰 Fee Required</span>
                      ) : (
                        <span className="info-tag free">✨ Free</span>
                      )}
                      {activity.isReservationRequired === "true" && (
                        <span className="info-tag reservation">📅 Reservation</span>
                      )}
                      {activity.arePetsPermitted === "true" && (
                        <span className="info-tag pets">🐕 Pet Friendly</span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedActivity === activity.id && (
                    <div className="activity-details">
                      <div className="details-grid">
                        <div className="detail-section">
                          <h5>Description</h5>
                          <p>{stripHtml(activity.activityDescription || activity.longDescription)}</p>
                        </div>

                        {activity.season && activity.season.length > 0 && (
                          <div className="detail-section">
                            <h5>Best Seasons</h5>
                            <div className="season-tags">
                              {activity.season.map((season, index) => (
                                <span key={index} className="season-tag">
                                  {season}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {activity.accessibilityInformation && (
                          <div className="detail-section">
                            <h5>Accessibility</h5>
                            <p>{stripHtml(activity.accessibilityInformation)}</p>
                          </div>
                        )}
                      </div>

                      {activity.url && (
                        <a
                          href={activity.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="activity-link">
                          More Information →
                        </a>
                      )}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="activity-actions">
                    <button
                      onClick={() =>
                        setExpandedActivity(expandedActivity === activity.id ? null : activity.id)
                      }
                      className="details-btn">
                      {expandedActivity === activity.id ? "Less Details" : "More Details"}
                    </button>

                    <button
                      onClick={() => addToItinerary(activity)}
                      className="add-activity-btn"
                      data-activity={activity.id}
                      disabled={itinerary.some((i) => i.title === activity.title)}>
                      {itinerary.some((i) => i.title === activity.title) ? "✓ Added" : "Add to Trip"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Itinerary Sidebar */}
          <div className="itinerary-sidebar">
            <div className="itinerary-header">
              <h3>Selected Activities</h3>
              <span className="count-badge">{activitiesInItinerary.length}</span>
            </div>

            {activitiesInItinerary.length === 0 ? (
              <div className="empty-itinerary">
                <p>No activities selected yet</p>
                <span className="empty-icon">🎯</span>
              </div>
            ) : (
              <ul className="itinerary-list">
                {activitiesInItinerary.map((item) => (
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
      </div>
    </section>
  );
};
