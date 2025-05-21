import { useState, useEffect } from "react";
import { getParkActivities } from "../../services/parkService";
import "./ParkActivities.css";

export const ParkActivities = ({ trip, onActivitySelect }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getParkActivities()
      .then((data) => {
        setActivities(data);
        setLoading(false);
        if (data.length === 0) {
          setError("No activities available");
        }
      })
      .catch(() => {
        setError("Failed to fetch activities");
        setLoading(false);
      });
  }, []);

  const handleActivityToggle = (activity) => {
    const isSelected = selectedActivities.some((a) => a.id === activity.id);
    let updatedActivities;
    if (isSelected) {
      updatedActivities = selectedActivities.filter((a) => a.id !== activity.id);
    } else {
      updatedActivities = [...selectedActivities, activity];
    }
    setSelectedActivities(updatedActivities);
    onActivitySelect(updatedActivities); // Pass to parent for CRUD
  };

  return (
    <div className="activity-selector">
      <h2>Select Activities for {trip?.parkName}</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities available.</p>}
      {!loading && !error && activities.length > 0 && (
        <ul className="activity-list">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className={`activity-item ${
                selectedActivities.some((a) => a.id === activity.id) ? "selected" : ""
              }`}
              onClick={() => handleActivityToggle(activity)}>
              {activity.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
