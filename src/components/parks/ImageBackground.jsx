// import { useState, useEffect } from "react";
// import { getAllImages } from "../../services/parkService.js";
// import "./ImageSlider.css";

// const ImageBackground = () => {
//   const [allImages, setAllImages] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div
//       className="image-slider"
//       style={{ backgroundImage: `url(${images[currentImageIndex]})` }}></div>
//   );
// };
