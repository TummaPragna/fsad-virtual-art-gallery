import { useEffect, useState } from "react";
import AdminNotifications from "../components/AdminNotifications";

function Admin() {
  const token = localStorage.getItem("token");

  const [artworks, setArtworks] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("artworks");
  const [orders, setOrders] = useState([]);

  // 🔹 Fetch artworks
  useEffect(() => {
    fetch("http://localhost:8081/api/artworks")
      .then(res => res.json())
      .then(setArtworks);
  }, []);

  // 🔹 Fetch users
  useEffect(() => {
    fetch("http://localhost:8081/api/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // 🔥 FETCH ORDERS (JWT FIXED)
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8081/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setOrders)
      .catch(() => {
        console.log("Orders fetch failed");
      });
  }, [token]);

  // 🔹 Delete artwork
  const deleteArtwork = async (id) => {
    await fetch(`http://localhost:8081/api/artworks/${id}`, {
      method: "DELETE",
    });

    setArtworks(prev => prev.filter(a => a.id !== id));
  };

  // 🔹 Delete user
  const deleteUser = async (id) => {
    await fetch(`http://localhost:8081/api/users/${id}`, {
      method: "DELETE",
    });

    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // 🔥 UPDATE ORDER STATUS (JWT FIXED)
  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:8081/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      setOrders(prev =>
        prev.map(o => (o.id === id ? { ...o, status } : o))
      );
    } catch {
      console.log("Update failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-overlay">

        <div className="admin-topbar">
          <h2>Admin Panel</h2>

          <div className="admin-actions">
            <button
              className={`tab-btn ${activeTab === "artworks" ? "active" : ""}`}
              onClick={() => setActiveTab("artworks")}
            >
              Artworks
            </button>

            <button
              className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>

            <button
              className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>

            <div className="notification-wrapper">
              <AdminNotifications />
            </div>
          </div>
        </div>

        <div className="dashboard">

          {/* 🔹 STATS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <div className="stat-card">
              <h3>Total Artworks</h3>
              <p>{artworks.length}</p>
            </div>

            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{users.length}</p>
            </div>

            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{orders.length}</p>

              <p style={{ fontSize: "14px", marginTop: "5px", color: "#888" }}>
                {orders.length > 5 ? "🔥 High activity" : "📉 Low activity"}
              </p>
            </div>

            <div className="stat-card">
              <h3>Pending Orders</h3>
              <p>{orders.filter(o => o.status === "Pending").length}</p>
            </div>
          </div>

          {/* 🔹 ARTWORKS */}
          {activeTab === "artworks" && (
            <>
              <h1>Artwork Management</h1>

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
                          onClick={() => deleteArtwork(art.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* 🔹 USERS */}
          {activeTab === "users" && (
            <>
              <h1>User Management</h1>

              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <button
                          className="danger"
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* 🔹 ORDERS */}
          {activeTab === "orders" && (
            <>
              <h1>Order Management</h1>

              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Artwork</th>
                    <th>Buyer</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.artworkTitle}</td>
                      <td>{o.buyerName}</td>
                      <td>{o.status}</td>
                      <td>
                        {o.status === "Pending" && (
                          <button onClick={() => updateOrderStatus(o.id, "Approved")}>
                            Approve
                          </button>
                        )}

                        {o.status === "Approved" && (
                          <button onClick={() => updateOrderStatus(o.id, "Delivered")}>
                            Deliver
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;