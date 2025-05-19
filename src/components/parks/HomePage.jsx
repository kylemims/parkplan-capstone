import { getAllParks } from "../../services/parkService.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DropDown } from "./DropDown.jsx";
import "./HomePage.css";

// component for dropdown list of parks for user to select from and create a trip
export const HomePage = () => {
  const [parks, setParks] = useState([]);
  const [selectedParkId, setSelectedParkId] = useState(0);
  const navigate = useNavigate();

  // fetch all parks from API when component mounts
  useEffect(() => {
    getAllParks().then(setParks);
  }, []);

  const handleSelect = (e) => {
    const id = parseInt(e.target.value);
    setSelectedParkId(id);
    if (id > 0) {
      navigate(`/parks/${id}`);
    }
  };

  return (
    <section className="park-selector">
      <p className="small-title">WELCOME TO</p>
      <h1>Pick A Park</h1>
      <img className="park-logo" src="/images/PickLogo.png" alt="Park" />
      <p>Ready to plan your next adventure?</p>
      <h2>Select a National Park</h2>
      <div className="dropdown-container">
        <DropDown options={parks} selectedValue={selectedParkId} onChange={handleSelect} />
      </div>
    </section>
  );
};
