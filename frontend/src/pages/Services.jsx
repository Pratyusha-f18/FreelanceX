import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../config";

function Services() {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const query = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    fetch(`${BASE_URL}/services`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          setServices([
            {
              id: 1,
              title: "Web Development",
              description: "Build modern websites",
              price: 500,
              rating: 4.5,
              imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            },
            {
              id: 2,
              title: "Logo Design",
              description: "Creative logo design",
              price: 200,
              rating: 4.7,
              imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"
            }
          ]);
        } else {
          setServices(data);
        }

        // fetch reviews
        data.forEach(s => {
          fetch(`${BASE_URL}/book/service/${s.title}`)
            .then(res => res.json())
            .then(r => {
              setReviews(prev => ({ ...prev, [s.title]: r }));
            });
        });
      })
      .catch(() => setServices([]));
  }, []);

  // DELETE SERVICE
  const deleteService = (id) => {
    fetch(`${BASE_URL}/services/${id}`, {
      method: "DELETE"
    }).then(() => {
      alert("Deleted ✅");
      setServices(services.filter(s => s.id !== id));
    });
  };

  // FILTER SEARCH
  const filtered = services.filter(s =>
    s.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>Services 🔍</h2>

      {/* ✅ ADD SERVICE BUTTON (TOP ONLY) */}
      {user?.role === "freelancer" && (
        <button
          style={styles.addBtn}
          onClick={() => navigate("/add-service")}
        >
          ➕ Add Service
        </button>
      )}

      <div style={styles.grid}>
        {filtered.map((s) => (
          <div key={s.id} style={styles.card}>
            
            <img
              src={
                s.imageUrl && s.imageUrl !== ""
                  ? s.imageUrl
                  : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              }
              style={styles.image}
            />

            <h3>{s.title}</h3>
            <p>{s.description}</p>

            <p>⭐ {s.rating || "4.5"}</p>
            <h4>₹{s.price}</h4>

            {/* REVIEWS */}
            <div style={styles.reviewBox}>
              {(reviews[s.title] || []).slice(0, 2).map((r, i) => (
                <div key={i} style={styles.review}>
                  ⭐ {r.rating || 5} - {r.comment || "Good service"}
                </div>
              ))}
            </div>

            {/* BOOK BUTTON */}
            <button
              style={styles.bookBtn}
              onClick={() => {
                if (!user || user.role !== "customer") {
                  alert("Only customers can book ❗");
                  return;
                }

                fetch(`${BASE_URL}/book`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    customerName: user.name,
                    serviceName: s.title,
                    status: "PENDING"
                  })
                }).then(() => {
                  alert("Booked ✅ Waiting for freelancer");
                });
              }}
            >
              Book Now
            </button>

            {/* DELETE BUTTON */}
            {user?.role === "freelancer" && (
              <button
                style={styles.deleteBtn}
                onClick={() => deleteService(s.id)}
              >
                ❌ Delete
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    minHeight: "100vh",
    color: "white"
  },

  addBtn: {
    marginBottom: "20px",
    padding: "10px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "#1e293b",
    borderRadius: "12px",
    padding: "15px",
    color: "white",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  bookBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#1dbf73",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    cursor: "pointer"
  },

  deleteBtn: {
    marginTop: "8px",
    padding: "8px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: "6px",
    color: "white",
    width: "100%",
    cursor: "pointer"
  },

  reviewBox: {
    marginTop: "10px"
  },

  review: {
    background: "#334155",
    padding: "6px",
    borderRadius: "5px",
    marginTop: "5px",
    fontSize: "12px",
    color: "white"
  }
};

export default Services;