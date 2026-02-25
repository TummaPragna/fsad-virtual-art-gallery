import { useState } from "react";

function Curator() {
  const [artworks, setArtworks] = useState([
    { id: 1, title: "Urban Lines", artist: "Aarav Sharma", status: "Pending" },
    { id: 2, title: "Mountain Silence", artist: "Meera Iyer", status: "Pending" },
    { id: 3, title: "Golden Horizon", artist: "Rohan Das", status: "Pending" },
    { id: 4, title: "City Motion", artist: "Ananya Patel", status: "Pending" },
  ]);

  const handleReview = (id, decision) => {
    const updated = artworks.map((art) =>
      art.id === id ? { ...art, status: decision } : art
    );
    setArtworks(updated);
  };

  return (
    <div className="dashboard">
      <h1>Curator Panel</h1>
      <p>Review and approve artworks for exhibition.</p>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Status</th>
            <th>Review</th>
          </tr>
        </thead>

        <tbody>
          {artworks.map((art) => (
            <tr key={art.id}>
              <td>{art.title}</td>
              <td>{art.artist}</td>
              <td>{art.status}</td>
              <td>
                <button onClick={() => handleReview(art.id, "Approved")}>
                  Approve
                </button>

                <button
                  className="danger"
                  onClick={() => handleReview(art.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Curator;