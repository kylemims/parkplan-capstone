// // src/components/ActivitySelector.jsx
import { useState, useEffect } from "react";
import { getParkCampgrounds } from "../../services/parkService.js";
import "./CampgroundSelector.css";

export const CampgroundSelector = ({ trip, onCampgroundSelect }) => {
  const [campgrounds, setCampgrounds] = useState([]);
//   const [selectedCampgrounds, setSelectedCampgrounds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  useEffect(() => {
//     setLoading(true);
    getParkCampgrounds(trip?.parkCode)
      .then((data) => {
//         console.log("Fetched campgrounds:", data); // Debug log
        setCampgrounds(data);
//         setLoading(false);
//         if (data.length === 0) {
//           setError("No campgrounds available for this park");
        }
      // })
//       .catch(() => {
//         setError("Failed to fetch campgrounds");
//         setLoading(false);
//       });
  // }, [trip?.parkCode]);

//   const handleCampgroundToggle = (campground) => {
//     const isSelected = selectedCampgrounds.some((a) => a.id === campground.id);
//     let updatedCampgrounds;
//     if (isSelected) {
//       updatedCampgrounds = selectedCampgrounds.filter((a) => a.id !== campground.id);
//     } else {
//       updatedCampgrounds = [...selectedCampgrounds, campground];
//     }
//     setSelectedCampgrounds(updatedCampgrounds);
//     onCampgroundSelect(updatedCampgrounds);
  };

  return (
    <div className="campground-selector">
      <h2>Select Campgrounds for {trip?.parkName}</h2>
{/* //       {loading && <p>Loading campgrounds...</p>}
//       {error && <p>Error: {error}</p>}
//       {!loading && !error && campgrounds.length === 0 && <p>No campgrounds available.</p>}
//       {!loading && !error && campgrounds.length > 0 && ( */}
        <ul className="campground-list">
          {campgrounds?.map((campground) => (
            <li
              key={campground.id}
              className={`campground-item ${
                selectedCampgrounds.some((a) => a.id === campground.id) ? "selected" : ""
              }`}
              onClick={() => handleCampgroundToggle(campground)}>
              {campground.name}
            </li>
          ))}
        </ul>
      {/* )} */}
    </div>
  );
};
