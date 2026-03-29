import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../config";
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
          fetch(`http://localhost:8081/book/service/${s.title}`)
            .then(res => res.json())
            .then(r => {
              setReviews(prev => ({ ...prev, [s.title]: r }));
            });
        });
      })
      .catch(() => setServices([]));
  }, []);

  const deleteService = (id) => {
    fetch(`http://localhost:8081/services/${id}`, {
      method: "DELETE"
    }).then(() => {
      alert("Deleted ✅");
      setServices(services.filter(s => s.id !== id));
    });
  };

  const filtered = services.filter(s =>
    s.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>Services 🔍</h2>

      <div style={styles.grid}>
        {filtered.map((s) => (
          <div
  style={styles.card}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 0 20px #38bdf8";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 0 10px rgba(56,189,248,0.2)";
  }}
>
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
                  onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-5px)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0)";
}}
                </div>
              ))}
            </div>

            <button
  style={styles.button}
  onClick={() => {
    if (!user || user.role !== "customer") {
      alert("Only customers can book ❗");
      return;
    }

    fetch("http://localhost:8081/book", {
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
                ❌
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px"
  },

 card: {
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  padding: "15px",
  color: "#111"   // ✅ ADD THIS
},

  image: {
  width: "100%",
  height: "160px",
  objectFit: "cover"
},

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#1dbf73",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    width: "100%"
  },

  deleteBtn: {
    marginTop: "8px",
    padding: "5px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: "6px",
    color: "white",
    width: "40px"
  },

  reviewBox: {
    marginTop: "10px"
  },

  review: {
    background: "#111827",
    padding: "6px",
    borderRadius: "5px",
    marginTop: "5px",
    fontSize: "12px"
  }
};

export default Services;