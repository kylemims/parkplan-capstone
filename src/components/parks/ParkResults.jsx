import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParks } from "../../services/parkService";
import "./ParkResults.css";

export const ParkResults = () => {
  const [filteredParks, setFilteredParks] = useState([]);
  const [prefs, setPrefs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPrefs = JSON.parse(localStorage.getItem("tripPreferences"));
    if (!storedPrefs) {
      navigate("/preferences");
      return;
    }

    setPrefs(storedPrefs);

    getAllParks().then((parks) => {
      const matches = parks.filter((park) => {
        const matchesSeason = !storedPrefs.season || park.bestTime.toLowerCase().includes(storedPrefs.season);
        const matchesWeather =
          !storedPrefs.weather || park.weather?.toLowerCase().includes(storedPrefs.weather);
        const matchesInterest =
          storedPrefs.interests.length === 0 ||
          storedPrefs.interests.some((interest) =>
            park.highlights?.toLowerCase().includes(interest.toLowerCase())
          );

        return matchesSeason && matchesWeather && matchesInterest;
      });

      setFilteredParks(matches);
    });
  }, [navigate]);

  const handlePlanTrip = (parkId) => {
    navigate(`/parks/${parkId}`);
  };

  if (!prefs) return <p>Loading preferences...</p>;

  return (
    <section className="park-results">
      <h1>Top Matches for Your Adventure</h1>
      <p>
        Showing results for: <strong>{prefs.season}</strong> season, <strong>{prefs.weather}</strong> weather,
        and interests in <strong>{prefs.interests.join(", ") || "any activities"}</strong>.
      </p>
      <div className="results-grid">
        {filteredParks.length > 0 ? (
          filteredParks.map((park) => (
            <div key={park.id} className="park-card">
              <img src={`/images/${park.code}-1.jpg`} alt={park.name} />
              <h2>{park.name}</h2>
              <p>{park.description}</p>
              <button onClick={() => handlePlanTrip(park.id)}>Plan This Trip</button>
            </div>
          ))
        ) : (
          <p>No parks match your preferences. Try adjusting your filters.</p>
        )}
      </div>
      <div className="results-controls">
        <button onClick={() => navigate("/preferences")}>🔁 Change Preferences</button>
        <button onClick={() => navigate("/")}>🏠 Return Home</button>
      </div>
    </section>
  );
};
