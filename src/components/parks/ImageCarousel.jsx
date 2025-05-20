import { useState } from "react";
import "./ParkDetails.css"; // or create a separate CSS file if you prefer

export const ImageCarousel = ({ images, parkName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="carousel-container">
      <button onClick={prevImage} className="carousel-btn">
        ‹
      </button>
      <img
        src={images[currentImageIndex].url}
        alt={`${parkName} image ${currentImageIndex + 1}`}
        className="carousel-image"
      />
      <button onClick={nextImage} className="carousel-btn">
        ›
      </button>
    </div>
  );
};
