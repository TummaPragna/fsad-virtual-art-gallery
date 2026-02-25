import { createContext, useState } from "react";

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const[approvedByCurator, setApprovedByCurator] = useState([]);
  const[buyRequests, setBuyRequests] = useState([]);

  // 🔹 Artist Upload
  const addArtwork = (title, image) => {
    const newArt = {
      id: Date.now(),
      title,
      image,
      artist: "Uploaded Artist",
      status: "Pending", // pending until curator approves
    };

    setArtworks(prev => [...prev, newArt]);
  };

  // 🔹 Curator Approves
  const approveArtwork = (id) => {
    setArtworks(prev =>
      prev.map(a => a.id === id ? { ...a, status: "Approved" } : a)
    );
  };

  // 🔹 Curator Rejects
  const rejectArtwork = (id) => {
    setArtworks(prev =>
      prev.map(a => a.id === id ? { ...a, status: "Rejected" } : a)
    );
  };
  // 🔹 Admin Deletes Artwork
const deleteArtwork = (id) => {
  setArtworks(prev => prev.filter(a => a.id !== id));
};
// 🔹 Curator sends approved artwork to Admin
const curatorApprove = (art) => {
  const approvedArt = {
    ...art,
    approvedAt: new Date().toLocaleString()
  };

  setApprovedByCurator(prev => [...prev, approvedArt]);
};
  // 🔹 Visitor Purchase Request
  // 🔹 Visitor sends purchase request → Admin Notification
const requestPurchase = (art) => {
  const request = {
    id: Date.now(),
    title: art.title,
    artist: art.artist,
    time: new Date().toLocaleString(),
    status: "Waiting"
  };

  setBuyRequests(prev => [...prev, request]);
};

  

  return (
    <GalleryContext.Provider
      value={{
  artworks,
  addArtwork,
  approveArtwork,
  rejectArtwork,
  deleteArtwork,

  curatorApprove,
  approvedByCurator,

  requestPurchase,
  buyRequests
}}
    >
      {children}
    </GalleryContext.Provider>
  );
};