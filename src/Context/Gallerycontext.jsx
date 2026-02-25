import { createContext, useState } from "react";

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);

  // 🔹 NEW: store user inquiries
  const [inquiries, setInquiries] = useState([]);

  const addArtwork = (title, image) => {
    const newArt = {
      id: Date.now(),
      title,
      image,
      artist: "Uploaded Artist",
      status: "Pending",
    };

    setArtworks(prev => [...prev, newArt]);
  };

  const approveArtwork = (id) => {
    setArtworks(prev =>
      prev.map(a => (a.id === id ? { ...a, status: "Approved" } : a))
    );
  };

  const rejectArtwork = (id) => {
    setArtworks(prev =>
      prev.map(a => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
  };

  const deleteArtwork = (id) => {
    setArtworks(prev => prev.filter(a => a.id !== id));
  };

  // 🔹 NEW FUNCTION → called when visitor clicks Contact Gallery
  const contactGallery = (artwork) => {
    const newInquiry = {
      id: Date.now(),
      artworkTitle: artwork.title,
      artist: artwork.artist,
      status: "New Inquiry",
    };

    setInquiries(prev => [...prev, newInquiry]);
  };

  return (
    <GalleryContext.Provider
      value={{
        artworks,
        addArtwork,
        approveArtwork,
        rejectArtwork,
        deleteArtwork,
        contactGallery,
        inquiries
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};