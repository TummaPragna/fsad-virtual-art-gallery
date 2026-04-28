import { useState, useEffect } from "react";

function AdminNotifications() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  // 🔹 Fetch orders from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => console.log("Failed to load orders"));
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* 🔔 Bell */}
      <button onClick={() => setOpen(!open)}>
        🔔 {orders.length}
      </button>

      {/* 🔽 Dropdown */}
      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "40px",
          width: "280px",
          background: "#1e1e2f",
          color: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          zIndex: 1000
        }}>
          <h4 style={{ marginBottom: "10px" }}>Orders</h4>

          {orders.length === 0 && (
            <p style={{ color: "#ccc" }}>No orders yet</p>
          )}

          {orders.map((o) => (
            <p key={o.id}>
              🛒 {o.buyerName} ordered "{o.artworkTitle}"
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminNotifications;