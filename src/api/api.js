const BASE_URL = "http://localhost:8081/api";

// GET all artworks
export const getArtworks = async () => {
  const res = await fetch(`${BASE_URL}/artworks`);
  return res.json();
};

// ADD artwork
export const addArtworkAPI = async (art) => {
  return await fetch(`${BASE_URL}/artworks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(art),
  });
};

// DELETE artwork
export const deleteArtworkAPI = async (id) => {
  return await fetch(`${BASE_URL}/artworks/${id}`, {
    method: "DELETE",
  });
};

// APPROVE artwork
export const approveArtworkAPI = async (id) => {
  return await fetch(`${BASE_URL}/artworks/${id}/approve`, {
    method: "PUT",
  });
};