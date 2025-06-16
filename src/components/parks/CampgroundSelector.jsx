import { useState, useEffect } from "react";
import { GetNPSCampgrounds } from "../../services/parkService.js";
import "./CampgroundSelector.css";
import { IconTooltipButton } from "../templates/IconTooltipButton.jsx";

export const CampgroundSelector = () => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    GetNPSCampgrounds().then(setCampgrounds);
  }, []);

  return (
    <section className="campground-selector">
      <h2>Select Campgrounds for {}</h2>
      <img className="tree-logo" src="/images/tree-park-logo@4x.png"></img>
      <div className="camp-container">
        <ul className="campground-list">
          {campgrounds.data?.map((campground) => (
            <li key={campground.id} className="campground-item">
              <div className="campground-row">
                <IconTooltipButton
                  onClick={() => console.log(`Selected campground: ${campground.name}`)}
                  iconSrc="/images/time-icon.svg"
                  tooltipContent={
                    <div className="tooltip-content">
                      <p>{campground.description}</p>
                      <p>
                        <strong>Location:</strong> {campground.location}
                      </p>
                      <p>
                        <strong>Open Year-Round:</strong> {campground.openYearRound ? "Yes" : "No"}
                      </p>
                    </div>
                  }></IconTooltipButton>
                <p>{campground.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
