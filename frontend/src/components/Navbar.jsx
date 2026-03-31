import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>FreelanceX</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/services" style={styles.link}>Explore</Link>

        {user?.role === "freelancer" && (
          <>
            <Link to="/add" style={styles.link}>Add Service</Link>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </>
        )}

        {user?.role === "customer" && (
          <Link to="/bookings" style={styles.link}>Orders</Link>
        )}

        <Link to="/profile" style={styles.link}>Profile</Link>

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Sign In</Link>
            <Link to="/register" style={styles.joinBtn}>Join</Link>
            
          </>
        ) : (
          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 60px",
    background: "white",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  logo: {
    color: "#1dbf73",
    fontWeight: "bold",
    fontSize: "24px"
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "14px"
  },
  joinBtn: {
    background: "#1dbf73",
    color: "white",
    padding: "8px 16px",
    borderRadius: "5px",
    textDecoration: "none"
  },
  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Navbar;