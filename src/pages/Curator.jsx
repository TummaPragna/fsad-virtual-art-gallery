import { useEffect, useState } from "react";
import { getArtworks, approveArtworkAPI } from "../api/api";

function Curator() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    getArtworks()
      .then((data) => setArtworks(data))
      .catch(() => alert("Failed to load artworks"));
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveArtworkAPI(id);

      setArtworks((prev) =>
        prev.map((art) =>
          art.id === id ? { ...art, status: "Approved" } : art
        )
      );
    } catch {
      alert("Approval failed");
    }
  };

  return (
    <div className="curator-page">
      <div className="curator-overlay">
        <div className="dashboard">
          <h1>Curator Panel</h1>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {artworks.map((art) => (
                <tr key={art.id}>
                  <td>{art.title}</td>
                  <td>{art.artist}</td>
                  <td>{art.status}</td>
                  <td>
                    <button onClick={() => handleApprove(art.id)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Curator;