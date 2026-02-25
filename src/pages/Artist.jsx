import { useState, useContext } from "react";
import { GalleryContext } from "../Context/Gallerycontext";

function Artist() {
  const { addArtwork } = useContext(GalleryContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleUpload = () => {
    if (!title || !image) {
      alert("Please fill all fields");
      return;
    }

    // This already adds artwork to context
    addArtwork(title, image);

    setTitle("");
    setImage("");
  };

  return (
  <div className="artist-page">
    <div className="artist-overlay">
      <div className="artist-box">
        <h2>Upload New Artwork</h2>

        <input
          type="text"
          placeholder="Artwork Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Direct Image URL (.jpg/.png)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleUpload}>
          Upload Artwork
        </button>
      </div>
    </div>
  </div>
);
}

export default Artist;