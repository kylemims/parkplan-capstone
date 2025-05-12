import { getAllParks } from "../../services/parkService.js";
import { useState, useEffect } from "react";
import { createTrip } from "../../services/tripService.js";
import { useNavigate } from "react-router-dom";
import { CreateNewTripForm } from "../forms/CreateNewTripForm.jsx";
import "./ParkSelector.css";

export const ParkSelector = () => {
  const [parks, setParks] = useState([]);
  const [selectedParkId, setSelectedParkId] = useState(0);
  const [tripName, setTripName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllParks().then(setParks);
  }, []);

  const handleSelect = (e) => {
    setSelectedParkId(parseInt(e.target.value));
  };

  const selectedPark = parks.find((park) => park.id === selectedParkId);

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
      <p>Readay to plan your next adventure?</p>
      <h2>Select a National Park</h2>
      {/*// controlled input: dropdown is synced w/ state */}
      <select value={selectedParkId} onChange={handleSelect}>
        <option value="0">Select a park...</option>
        {parks?.map((park) => (
          <option key={park.id} value={park.id}>
            {park.name}
          </option>
        ))}
      </select>
      {/* // Only show this div IF (&&) */}
      {selectedPark && (
        <div className="park-preview">
          <h3>{selectedPark.name}</h3>
          <p>
            <strong>Location:</strong>
            {selectedPark.location}
          </p>
          <p>{selectedPark.description}</p>
          {selectedPark.imageUrl && <img src={selectedPark.imageUrl} alt={selectedPark.name} />}
          {/* Add park highlights here - stretch goals (attractions) */}
          <CreateNewTripForm
            tripName={tripName}
            setTripName={setTripName}
            handleAddTrip={handleAddTrip}
          />
        </div>
      )}
    </section>
  );
};
