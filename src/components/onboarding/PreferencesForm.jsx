import "./PreferencesForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const PreferencesForm = () => {
  const navigate = useNavigate();
  const [season, setSeason] = useState("");
  const [weather, setWeather] = useState("");
  const [interests, setInterests] = useState([]);

  const interestOptions = [
    { label: "Photography", icon: "/icons/camera-black.svg" },
    { label: "Water Activities", icon: "/icons/canoe-black.svg" },
    { label: "Wildlife", icon: "/icons/bear-black.svg" },
    { label: "Hiking", icon: "/icons/hiker-black.svg" },
  ];

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prefs = { season, weather, interests };
    localStorage.setItem("tripPreferences", JSON.stringify(prefs));
    navigate("/parks/results", { state: { preferences: prefs } });
  };

  return (
    <section className="preferences-form fade-in-block">
      <h1>What does your dream trip look like?</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Preferred Season:
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="">Select one</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </label>

        <label>
          Weather Preference:
          <select value={weather} onChange={(e) => setWeather(e.target.value)}>
            <option value="">Select one</option>
            <option value="cool & dry">Cool & Dry</option>
            <option value="warm & sunny">Warm & Sunny</option>
            <option value="snowy">Snowy</option>
            <option value="mild">Mild</option>
          </select>
        </label>
        <fieldset>
          <legend>What are you into?</legend>
          <div className="interest-grid">
            {interestOptions.map(({ label, icon }) => {
              const selected = interests.includes(label);
              return (
                <div
                  key={label}
                  className={`interest-card ${selected ? "selected" : ""}`}
                  onClick={() => toggleInterest(label)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && toggleInterest(label)}>
                  <img src={icon} alt={label} className="interest-icon" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </fieldset>

        <button type="submit" className="home-btn">
          See Park Matches
        </button>
      </form>
    </section>
  );
};
