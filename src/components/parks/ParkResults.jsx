import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllParks } from "../../services/parkService";
import { getImagesByParkId } from "../../services/parkService";
import "./ParkResults.css";

const ParkResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preferences = location.state?.preferences;
  const [parkImages, setParkImages] = useState({});
  const [filteredParks, setFilteredParks] = useState([]);

  useEffect(() => {
    getAllParks().then((allParks) => {
      const imagePromises = allParks.map((park) =>
        getImagesByParkId(park.id).then((images) => ({
          parkId: park.id,
          imageUrl: images && images.length > 0 ? images[0].url : null,
        }))
      );

      Promise.all(imagePromises).then((imageResults) => {
        const imageMap = {};
        imageResults.forEach((result) => {
          imageMap[result.parkId] = result.imageUrl;
        });
        setParkImages(imageMap);
      });

      if (preferences) {
        const matches = allParks.filter((park) => {
          let matchCount = 0;

          if (preferences.season) {
            const seasonMatch =
              park.season?.toLowerCase() === preferences.season.toLowerCase() ||
              park.bestTime?.toLowerCase().includes(preferences.season.toLowerCase());
            if (seasonMatch) matchCount++;
          }

          if (preferences.weather) {
            const weatherMap = {
              "cool-dry": "cool & dry",
              "warm-sunny": "warm & sunny",
              mild: "mild",
            };
            const dbWeather = weatherMap[preferences.weather] || preferences.weather;
            if (park.weather?.toLowerCase() === dbWeather.toLowerCase()) {
              matchCount++;
            }
          }

          if (preferences.interests?.length > 0) {
            const parkActivities = park.activities || [];
            const hasMatchingActivity = preferences.interests.some((interest) =>
              parkActivities.some(
                (activity) =>
                  activity.toLowerCase().includes(interest.toLowerCase()) ||
                  interest.toLowerCase().includes(activity.toLowerCase())
              )
            );
            if (hasMatchingActivity) matchCount++;
          }

          return matchCount >= 1;
        });

        matches.sort((a, b) => {
          // Calculate match scores for sorting
          const scoreA = calculateMatchScore(a, preferences);
          const scoreB = calculateMatchScore(b, preferences);
          return scoreB - scoreA;
        });

        setFilteredParks(matches);
      }
    });
  }, [preferences]);

  const calculateMatchScore = (park, preferences) => {
    let score = 0;

    if (preferences.season) {
      const seasonMatch =
        park.season?.toLowerCase() === preferences.season.toLowerCase() ||
        park.bestTime?.toLowerCase().includes(preferences.season.toLowerCase());
      if (seasonMatch) score++;
    }

    if (preferences.weather) {
      const weatherMap = {
        "cool & dry": "cool & dry",
        "warm & sunny": "warm & sunny",
        mild: "mild",
        snowy: "snowy",
      };
      const dbWeather = weatherMap[preferences.weather] || preferences.weather;
      if (park.weather?.toLowerCase() === dbWeather.toLowerCase()) {
        score++;
      }
    }

    if (preferences.interests?.length > 0) {
      const parkActivities = park.activities || [];
      const hasMatchingActivity = preferences.interests.some((interest) =>
        parkActivities.some(
          (activity) =>
            activity.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(activity.toLowerCase())
        )
      );
      if (hasMatchingActivity) score++;
    }

    return score;
  };

  return (
    <section className="results-container fade-in-block">
      <h1>Your Park Matches</h1>
      <div className="results-header">
        <button className="back-to-filters-btn" onClick={() => navigate("/preferences")}>
          ᗕ Back to Filters
        </button>
        <p>Found {filteredParks.length} parks matching your preferences</p>
      </div>
      {filteredParks.length > 0 ? (
        <div className="result-grid">
          {filteredParks.map((park) => (
            <div className="park-card" key={park.id}>
              <img src={parkImages[park.id] || "/images/default-park.jpg"} alt={park.name} loading="lazy" />
              <div className="park-info">
                <h2>{park.name}</h2>
                <span className="park-location-name">{park.location}</span>
                <p>
                  <strong>Best Time:</strong> {park.bestTime}
                </p>
                <p>
                  <strong>Wildlife:</strong> {park.wildlife}
                </p>
                <p>
                  <strong>Highlights:</strong> {park.highlights}
                </p>
              </div>
              <button onClick={() => navigate(`/parks/${park.id}`)}>View Details</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="park-card-no-matches">
          <h2>No perfect matches</h2>
          <p>Try adjusting your preferences for more results.</p>
          <button onClick={() => navigate("/preferences")}>Update Preferences</button>
        </div>
      )}
    </section>
  );
};

export default ParkResults;
