import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GalleryContext } from "../Context/Gallerycontext";
import artworksData from "../data/artworks";
import { getArtworks } from "../api/api";
//commit6
function Home() {
  const [artworks, setArtworks] = useState([]);


useEffect(() => {
  getArtworks()
    .then((data) => {
      setArtworks([...artworksData, ...data]);
    })
    .catch(() => alert("Failed to load artworks"));
}, []);

  return (
    <div className="gallery">
      <div className="container">
        <h2>Featured Artworks</h2>

        <div className="card-container">
          {artworks.map((art) => (
            <div className="card" key={art.id}>
              <img
                src={art.image}
                alt={art.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Artwork";
                }}
              />

              <div className="card-content">
                <h3>{art.title}</h3>
                <p>By {art.artist}</p>

                <p style={{ fontSize: "14px", color: "#777" }}>
                  {art.description
                    ? art.description.substring(0, 80)
                    : "No description"}...
                </p>

                <Link to={`/details/${art.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;