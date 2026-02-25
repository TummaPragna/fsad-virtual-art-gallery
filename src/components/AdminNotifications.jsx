import { useContext, useState } from "react";
import { GalleryContext } from "../Context/Gallerycontext";

function AdminNotifications() {
  const { buyRequests, approvedByCurator } = useContext(GalleryContext);
  const [open, setOpen] = useState(false);

  const total = buyRequests.length + approvedByCurator.length;

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}>
        🔔 {total}
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "40px",
          width: "300px",
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
          zIndex: 100
        }}>
          <h4>Notifications</h4>

          {approvedByCurator.map((a, i) => (
            <p key={i}>✅ Curator approved: {a.title}</p>
          ))}

          {buyRequests.map((r, i) => (
<p key={i}>🛒 Purchase request for "{r.title}"</p>          ))}

          {total === 0 && <p>No new updates</p>}
        </div>
      )}
    </div>
  );
}

export default AdminNotifications;