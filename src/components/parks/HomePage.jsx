import { getAllParks } from "../../services/parkService.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DropDown } from "./DropDown.jsx";
import { HomeHero } from "./HomeHero.jsx";
import { WelcomeLogoHero } from "./WelcomeLogoHero.jsx";
import "./HomePage.css";

export const HomePage = () => {
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
    <>
      <HomeHero />
      <WelcomeLogoHero />
      <div className="plan-adventure-block">
        <p>Ready to plan your next adventure?</p>
        {/* <img className="decoration-line" src="/images/deco-line.svg"></img> */}
        <span className="select-park-line">
          <h3>Select a National Park</h3>
        </span>
        <div className="dropdown-container">
          <DropDown options={parks} selectedValue={selectedParkId} onChange={handleSelect} />
        </div>
        <div className="bg-tab"></div>
      </div>
      {/* </section> */}
    </>
    // </div>
  );
};
