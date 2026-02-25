import { useState, useEffect } from "react";

function Tour() {
  const images = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262"
  ];

  const [current, setCurrent] = useState(0);

  // Auto-change artwork like walking in gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tour-hero">
      <div className="tour-overlay">

        <h1 className="tour-title">Virtual Gallery Tour</h1>
        <p className="tour-subtitle">
          Walk through our curated digital exhibition space.
        </p>

        {/* Main Display */}
        <div className="tour-frame">
          <img src={images[current]} alt="gallery" />
        </div>

        {/* Navigation Dots */}
        <div className="tour-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={i === current ? "dot active" : "dot"}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <button className="enter-btn">Enter Exhibition</button>

      </div>
    </div>
  );
}

export default Tour;