import { useState, useEffect } from "react";
import { FormInput } from "./FormInput.jsx";
import { getTripById, updateTrip } from "../../services/tripService.js";
import { getAllParks } from "../../services/parkService.js";
import { DropDown } from "../parks/DropDown.jsx";

export const TripEditForm = ({ tripId, onSuccess }) => {
  const [tripName, setTripName] = useState("");
  const [parkId, setParkId] = useState("");
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getTripById(tripId), getAllParks()]).then(([trip, parks]) => {
      if (isMounted) {
        setTripName(trip.name);
        setParkId(trip.parkId);
        setParks(parks);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [tripId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip(tripId, {
      name: tripName,
      parkId: parseInt(parkId),
    }).then(() => {
      if (onSuccess) onSuccess();
    });
  };

  if (loading) return <p>Loading trip...</p>;

  return (
    <form className="trip-form" onSubmit={handleSubmit}>
      <FormInput
        label="Trip Name"
        type="text"
        name="tripName"
        id="tripName"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        placeholder="Enter your updated trip name"
      />
      <div className="dropdown">
        <DropDown
          options={parks}
          selectedValue={parkId}
          onChange={(e) => setParkId(e.target.value)}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

// import { useState, useEffect } from "react";
// import { FormInput } from "./FormInput.jsx";
// import { getTripById, updateTrip } from "../../services/tripService.js";
// import { getAllParks } from "../../services/parkService.js";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { DropDown } from "../parks/DropDown.jsx";

// export const TripEditForm = () => {
//   const [trip, setTrip] = useState(null);
//   const [parks, setParks] = useState([]);
//   const navigate = useNavigate();
//   const { tripId } = useParams();

//   useEffect(() => {
//     getTripById(tripId).then(setTrip);
//     getAllParks().then(setParks);
//   }, [tripId]);

//   const handleChange = (e) => {
//     const copy = { ...trip };
//     copy[e.target.name] = e.target.value;
//     setTrip(copy);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // ...trip, -> copy and retain all properties while updating only parkId
//     updateTrip(trip.id, {
//       ...trip,
//       parkId: parseInt(trip.parkId),
//     }).then(() => navigate("/trips"));
//   };

//   if (!trip) return <p>Loading trip...</p>;

//   return (
//     <form className="trip-form" onSubmit={handleSubmit}>
//       <FormInput
//         label="Trip Name"
//         type="text"
//         name="name"
//         id="tripName"
//         value={trip.name}
//         onChange={handleChange}
//         placeholder="Enter your updated trip name"
//       />
//       <div className="dropdown">
//         <DropDown options={parks} selectedValue={trip.parkId} onChange={handleChange} />
//       </div>
//       <button type="submit">Save Changes</button>
//     </form>
//   );
// };
