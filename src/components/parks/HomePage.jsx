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
        <h2>Select a National Park</h2>
        <div className="dropdown-container">
          <DropDown options={parks} selectedValue={selectedParkId} onChange={handleSelect} />
        </div>
      </div>
      {/* </section> */}
    </>
    // </div>
  );
};

// import { getAllParks } from "../../services/parkService.js";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { DropDown } from "./DropDown.jsx";
// import "./HomePage.css";

// export const HomePage = () => {
//   const [parks, setParks] = useState([]);
//   const [selectedParkId, setSelectedParkId] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllParks().then(setParks);
//   }, []);

//   const handleSelect = (e) => {
//     const id = parseInt(e.target.value);
//     setSelectedParkId(id);
//     if (id > 0) {
//       navigate(`/parks/${id}`);
//     }
//   };

//   return (
//     <section className="park-selector">

//       <div className="welcome-container">
//         <p className="small-title">WELCOME TO</p>
//         <h1>Pick A Park</h1>
//       </div>
//       <img className="park-logo" src="/images/PickLogo.png" alt="Park" />
//       <div className="plan-adventure-block">
//         <p>Ready to plan your next adventure?</p>
//         <h2>Select a National Park</h2>
//       </div>
//       <div className="dropdown-container">
//         <DropDown options={parks} selectedValue={selectedParkId} onChange={handleSelect} />
//       </div>
//     </section>
//   );
// };
