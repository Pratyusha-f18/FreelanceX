import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={styles.hero}>
        <h1>Find the right freelance service, right away</h1>

        <div style={styles.searchBox}>
          <input
            placeholder="Search for any service..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/services?search=${e.target.value}`);
              }
            }}
          />
          <button onClick={() => navigate("/services")}>Search</button>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Popular Services</h2>

        <div style={styles.grid}>
          {["Web Dev", "Logo Design", "Video Editing", "AI Projects"].map((item, i) => (
            <div key={i} style={styles.card}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    background: "#0f172a",
    color: "white",
    padding: "100px 20px",
    textAlign: "center"
  },
  searchBox: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  },
  section: {
    padding: "40px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  card: {
    padding: "30px",
    background: "#f5f5f5",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer"
  }
};

export default Home;