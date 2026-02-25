import { useState } from "react";

function Admin() {
  const [artworks, setArtworks] = useState([
    { id: 1, title: "Urban Lines", artist: "Aarav Sharma", status: "Approved" },
    { id: 2, title: "Blue Geometry", artist: "Kiran Rao", status: "Approved" },
    { id: 3, title: "Forest Light", artist: "Dev Menon", status: "Pending" },
  ]);

  const handleDelete = (id) => {
    const filtered = artworks.filter((art) => art.id !== id);
    setArtworks(filtered);
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Manage gallery content and remove inappropriate artworks.</p>

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
                <button
                  className="danger"
                  onClick={() => handleDelete(art.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;