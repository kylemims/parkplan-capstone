import { useState, useEffect } from "react";
import { GetNPSCampgrounds } from "../../services/parkService.js";
import "./CampgroundSelector.css";

export const CampgroundSelector = () => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    GetNPSCampgrounds().then(setCampgrounds);
  }, []);

  return (
    <section className="campground-selector">
      <h2>Select Campgrounds for {}</h2>
      <div className="dropdown-container">
        <ul className="campground-list">
          {campgrounds.data?.map((campground) => (
            <li key={campground.id} className="campground-item">
              <p>{campground.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
