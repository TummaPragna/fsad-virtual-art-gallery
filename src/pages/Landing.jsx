import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1>Virtual Art Gallery</h1>

          <p>
            Experience immersive digital exhibitions, discover emerging artists,
            and explore culture through a modern virtual space.
          </p>

          <div className="landing-buttons">
            <button onClick={() => navigate("/login")}>
              Explore Gallery
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/tour")}
            >
              Take Virtual Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;