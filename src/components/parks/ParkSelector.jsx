import { getAllParks } from "../../services/parkService.js";
import { useState, useEffect } from "react";
import { createTrip } from "../../services/tripService.js";
import { useNavigate } from "react-router-dom";
import { CreateNewTripForm } from "../forms/CreateNewTripForm.jsx";
import "./ParkSelector.css";

// component for dropdown list of parks for user to select from and create a trip
export const ParkSelector = () => {
  const [parks, setParks] = useState([]);
  const [selectedParkId, setSelectedParkId] = useState(0);
  const [tripName, setTripName] = useState("");
  const navigate = useNavigate();

  // fetch all parks from API when component mounts
  useEffect(() => {
    getAllParks().then(setParks);
  }, []);

  const handleSelect = (e) => {
    setSelectedParkId(parseInt(e.target.value));
  };
  const selectedPark = parks.find((park) => park.id === selectedParkId);

  // Creates a newTrip object + triggers POST request via createTrip
  const handleAddTrip = () => {
    const localUser = localStorage.getItem("parkplan_user");
    const userObj = JSON.parse(localUser);

    const newTrip = {
      name: tripName,
      parkId: selectedParkId,
      userId: userObj.id,
      createdAt: new Date().toISOString(),
    };

    createTrip(newTrip).then(() => {
      navigate("/trips");
    });
  };

  return (
    <section className="park-selector">
      <h1>Welcome to Pick A Park 🌲</h1>
      <p>Ready to plan your next adventure?</p>
      <h2>Select a National Park</h2>

      {/* Renders dropdown - handleSelect updates selectedParkId */}
      <select value={selectedParkId} onChange={handleSelect}>
        <option value="0">Select a park...</option>
        {parks?.map((park) => (
          <option key={park.id} value={park.id}>
            {park.name}
          </option>
        ))}
      </select>

      {selectedPark && (
        <>
          <section className="park-preview">
            {/* && Display details if park is selected */}
            <div className="info-block">
              <h3>{selectedPark.name}</h3>
              <p>Location: {selectedPark.location}</p>
              <p>{selectedPark.description}</p>
            </div>

            <div className="image-block">
              {selectedPark.imageUrl && <img src={selectedPark.imageUrl} alt={selectedPark.name} />}
            </div>
          </section>

          <section className="trip-form-section">
            {/* Passing props to the trip creation form component */}
            <CreateNewTripForm
              tripName={tripName}
              setTripName={setTripName}
              handleAddTrip={handleAddTrip}
            />
          </section>
        </>
      )}
    </section>
  );
};
