import { getAllParks } from "../../services/parkService.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DropDown } from "./DropDown.jsx";
import "./HomeTest.css";

export const HomeTest = () => {
  const [parks, setParks] = useState([]);
  const [selectedParkId, setSelectedParkId] = useState(0);
  const navigate = useNavigate();

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
    <div className="auth-background">
      <img className="background-image" src="/images/zion-2.jpg" alt="yosemite" />
    <section className="park-selector">

      <div className="welcome-container">
        <p className="small-title">WELCOME TO</p>
        <h1>Pick <span className="second-word">A</span>Park</h1>
      </div>
      <img className="park-logo" src="/images/PickLogo.png" alt="Park" />
      <div className="plan-adventure-block">
        <p>Ready to plan your next adventure?</p>
        <h2>Select a National Park</h2>
      </div>
      <div className="dropdown-container">
        <DropDown options={parks} selectedValue={selectedParkId} onChange={handleSelect} />
      </div>
    </section>
    </div>
  );
};