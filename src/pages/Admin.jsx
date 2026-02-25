import { useState } from "react";
import AdminNotifications from "../components/AdminNotifications";
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
  <div className="admin-page">
    <div className="admin-overlay">

      <div className="admin-topbar">
        <h2>Admin Panel</h2>

        <div className="admin-actions">
          <button className="tab-btn active">Dashboard</button>
          <button className="tab-btn">Curator Decisions</button>
          <button className="tab-btn">Buy Requests</button>
          
          <div className="notification-wrapper">
            <AdminNotifications />
          </div>
        </div>
      </div>

      {/* KEEP YOUR EXISTING DASHBOARD EXACTLY SAME */}
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

    </div>
  </div>
);
}

export default Admin;