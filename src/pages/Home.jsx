import artworksData from "../data/artworks";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GalleryContext } from "../Context/Gallerycontext";

function Home() {
  const { artworks: uploadedArtworks } = useContext(GalleryContext);

  // Merge default artworks + artist uploaded artworks
  const allArtworks = [...artworksData, ...uploadedArtworks];

  return (
    <div className="gallery">
      <div className="container">
        <h2>Featured Artworks</h2>

        <div className="card-container">
          {allArtworks.map((art) => (
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

  <p style={{ fontSize: "14px", color: "#777", marginBottom: "10px" }}>
    {art.description?.substring(0, 80)}...
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