import { useParams } from "react-router-dom";
import artworks from "../data/artworks";
import { useContext, useState } from "react";
import { GalleryContext } from "../Context/Gallerycontext";

function Details() {
  const { id } = useParams();
  const { artworks: uploadedArtworks } = useContext(GalleryContext);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");

  const allArtworks = [...artworks, ...uploadedArtworks];
  const art = allArtworks.find(a => a.id === Number(id));

  if (!art) {
    return <h2 style={{ padding: "40px" }}>Artwork not found</h2>;
  }

  // 🔥 ORDER FUNCTION (JWT FIXED)
  const buyNow = async () => {
    setError("");

    if (!address || !phone) {
      setError("Please enter delivery details");
      return;
    }

    if (phone.length < 10) {
      setError("Enter valid phone number");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // ✅ JWT
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token) {
        setError("Please login again");
        return;
      }

      const res = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`   // 🔥 IMPORTANT
        },
        body: JSON.stringify({
          artworkTitle: art.title,
          buyerName: user?.name || "Visitor",
          address,
          phone,
          paymentMethod
        }),
      });

      if (!res.ok) throw new Error();

      alert("✅ Order placed successfully!");

      setShowForm(false);
      setAddress("");
      setPhone("");

    } catch {
      setError("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "40px" }}>
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>

        <img
          src={art.image}
          alt={art.title}
          style={{
            width: "420px",
            height: "320px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
          }}
        />

        <div>
          <h1>{art.title}</h1>
          <p style={{ color: "#666", marginTop: "10px" }}>
            By {art.artist}
          </p>

          {art.price && (
            <h2 style={{ color: "#6c63ff", marginTop: "15px" }}>
              {art.price}
            </h2>
          )}

          <p style={{ marginTop: "20px", maxWidth: "500px" }}>
            {art.description || "Artwork details"}
          </p>

          {!showForm && (
            <button onClick={() => setShowForm(true)} style={{ marginTop: "20px" }}>
              Buy Now
            </button>
          )}

          {showForm && (
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>

              <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Card</option>
              </select>
              {/* 🗺️ MAP */}
<iframe
  title="map"
  width="100%"
  height="180"
  style={{
    border: 0,
    borderRadius: "10px",
    marginTop: "10px"
  }}
  loading="lazy"
  src="https://maps.google.com/maps?q=india&t=&z=13&ie=UTF8&iwloc=&output=embed"
/>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <button onClick={buyNow} disabled={loading}>
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Details;