import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={{ fontSize: "36px" }}>
          Find the right freelance service, right away
        </h1>

        <div style={styles.searchBox}>
          <input
            placeholder="Search for any service..."
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/services?search=${e.target.value}`);
              }
            }}
          />

          <button
            style={styles.searchBtn}
            onClick={() => navigate("/services")}
          >
            Search
          </button>
        </div>
      </div>

      {/* POPULAR SERVICES */}
      <div style={styles.section}>
        <h2 style={{ color: "#1e293b" }}>Popular Services</h2>

        <div style={styles.grid}>
          {[
            { name: "Web Dev", color: "#3b82f6" },
            { name: "Logo Design", color: "#ec4899" },
            { name: "Video Editing", color: "#f59e0b" },
            { name: "AI Projects", color: "#10b981" }
          ].map((item, i) => (
            <div
              key={i}
              style={{ ...styles.card, background: item.color }}
              onClick={() =>
                navigate(`/services?search=${item.name}`)
              }
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
    color: "white",
    padding: "120px 20px",
    textAlign: "center"
  },

  searchBox: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },

  input: {
    padding: "12px",
    width: "300px",
    borderRadius: "8px",
    border: "none"
  },

  searchBtn: {
    padding: "12px 20px",
    background: "#1dbf73",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  section: {
    padding: "50px",
    background: "#f8fafc"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  transition: "0.3s"
}
};

export default Home;