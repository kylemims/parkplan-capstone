import "./PreferencesForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const PreferencesForm = () => {
  const navigate = useNavigate();
  const [season, setSeason] = useState("");
  const [weather, setWeather] = useState("");
  const [interests, setInterests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const prefs = {
      season,
      weather,
      interests,
    };

    localStorage.setItem("tripPreferences", JSON.stringify(prefs));

    navigate("/parks/results", {
      state: { preferences: prefs },
    });
  };

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <section className="preferences-form fade-in-block">
      <h1>What kind of trip are you dreaming of?</h1>
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
            <option value="cool-dry">Cool & Dry</option>
            <option value="warm-sunny">Warm & Sunny</option>
            <option value="snowy">Snowy</option>
            <option value="mild">Mild</option>
          </select>
        </label>

        <fieldset>
          <legend>What are you into?</legend>
          {["Hiking", "Wildlife", "Water Activities", "Photography"].map((interest) => (
            <label key={interest} className="checkbox-option">
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
              />
              {interest}
            </label>
          ))}
        </fieldset>

        <button type="submit" className="home-btn">
          See Park Matches
        </button>
      </form>
    </section>
  );
};
