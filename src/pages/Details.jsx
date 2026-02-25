import { useParams } from "react-router-dom";
import artworks from "../data/artworks";
import { useContext, useState } from "react";
import { GalleryContext } from "../Context/Gallerycontext";

function Details() {
  const { id } = useParams();
  const { artworks: uploadedArtworks, contactGallery } = useContext(GalleryContext);

  const [message, setMessage] = useState("");

  const allArtworks = [...artworks, ...uploadedArtworks];
  const art = allArtworks.find(a => a.id === Number(id));

  if (!art) {
    return <h2 style={{ padding: "40px" }}>Artwork not found</h2>;
  }

  const handleContact = () => {
    contactGallery(art);
    setMessage("Gallery contacted successfully. Please wait for response.");
  };

  return (
    <div className="container" style={{ padding: "40px" }}>
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>

        <img
          src={art.image}
          alt={art.title}
          style={{
            width: "420px",
            height: "320px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
          }}
        />

        <div>
          <h1>{art.title}</h1>
          <p style={{ color: "#666", marginTop: "10px" }}>
            By {art.artist}
          </p>

          {art.price && (
            <h2 style={{ color: "#6c63ff", marginTop: "15px" }}>
              {art.price}
            </h2>
          )}

          <p style={{ marginTop: "20px", maxWidth: "500px" }}>
            {art.description || "This artwork represents traditional heritage and storytelling."}
          </p>

          <button style={{ marginTop: "25px" }} onClick={handleContact}>
            Contact Gallery
          </button>

          {message && (
            <p style={{ color: "green", marginTop: "15px" }}>
              {message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Details;