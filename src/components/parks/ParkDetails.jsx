import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImagesByParkId, getParkById } from "../../services/parkService";
import { NewTripModal } from "../forms/NewTripModal.jsx";
import { ImageCarousel } from "./ImageCarousel.jsx";
import "./ParkDetails.css";
import "../forms/Form.css";

export const ParkDetails = () => {
  const { parkId } = useParams();
  const [park, setPark] = useState(null);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getParkById(parseInt(parkId)).then(setPark);
    getImagesByParkId(parseInt(parkId)).then(setImages);
  }, [parkId]);

  if (!park) return <p>Loading park details...</p>;

  return (
    <section className="park-details-container">
      <h1>{park.name}</h1>
      <p className="park-location">{park.location}</p>
      <ImageCarousel images={images} parkName={park.name} />
      <p className="park-tagline">{park.description}</p>
      <section className="park-info-block">
        <div className="weather-header">
          <img src="/images/weather-icon.svg" alt="Weather Icon" className="weather-icon" />
          <p>Best time to visit:</p>
        </div>

        <div className="weather-paragraph">
          <p>{park.bestTime}</p>
        </div>

        <div className="wildlife-header">
          <img src="/images/wildlife-icon.svg" alt="Wildlife Icon" className="wildlife-icon" />
          <p>Wildlife:</p>
        </div>

        <div className="wildlife-paragraph">
          <p>{park.wildlife}</p>
        </div>
      </section>
      <div className="trip-form-section">
        <button onClick={() => setOpenModal(true)}>+ Add Trip</button>
        <NewTripModal open={openModal} onClose={() => setOpenModal(false)} parkId={parkId} />
      </div>
    </section>
  );
};

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getImagesByParkId, getParkById } from "../../services/parkService";
// import { createTrip } from "../../services/tripService";
// import { CreateNewTripForm } from "../forms/CreateNewTripForm";
// import "./ParkDetails.css";
// import "../forms/Form.css";

// export const ParkDetails = () => {
//   const { parkId } = useParams();
//   const [park, setPark] = useState(null);
//   const [images, setImages] = useState([]);
//   const [tripName, setTripName] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getParkById(parseInt(parkId)).then(setPark);
//     getImagesByParkId(parseInt(parkId)).then(setImages);
//   }, [parkId]);

//   const handleAddTrip = () => {
//     const localUser = localStorage.getItem("parkplan_user");
//     const userObj = JSON.parse(localUser);

//     const newTrip = {
//       name: tripName,
//       park_id: parseInt(parkId),
//       user_id: userObj.id,
//       created_at: new Date().toISOString(),
//     };

//     createTrip(newTrip).then(() => navigate("/trips"));
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   if (!park) return <p>Loading park details...</p>;

//   return (
//     <section className="park-details-container">
//       <h1>{park.name}</h1>
//       <p className="park-location">{park.location}</p>

//       {images.length > 0 && (
//         <div className="carousel-container">
//           <button onClick={prevImage} className="carousel-btn">
//             ‹
//           </button>
//           <img
//             src={images[currentImageIndex].url}
//             alt={`${park.name} image ${currentImageIndex + 1}`}
//             className="carousel-image"
//           />
//           <button onClick={nextImage} className="carousel-btn">
//             ›
//           </button>
//         </div>
//       )}

//       <p className="park-tagline">{park.description}</p>

//       <section className="park-info-block">
//         <div className="weather-header">
//           <img src="/images/weather-icon.svg" alt="Weather Icon" className="weather-icon" />
//           <p>Best time to visit:</p>
//         </div>
//         <div className="weather-paragraph">
//           <p>{park.bestTime}</p>
//         </div>
//         <div className="wildlife-header">
//           <img src="/images/wildlife-icon.svg" alt="Wildlife Icon" className="wildlife-icon" />
//           <p>Wildlife:</p>
//         </div>
//         <div className="wildlife-paragraph">
//           <p>{park.wildlife}</p>
//         </div>
//       </section>

//       <div className="trip-form-section">
//         <CreateNewTripForm
//           tripName={tripName}
//           setTripName={setTripName}
//           handleAddTrip={handleAddTrip}
//         />
//       </div>
//     </section>
//   );
// };
