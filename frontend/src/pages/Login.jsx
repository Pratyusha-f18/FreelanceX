import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = () => {
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        if (user && user.email) {
          localStorage.setItem("user", JSON.stringify(user));
          alert("Login Successful ✅");

          // redirect based on role
          if (user.role === "freelancer") {
            navigate("/dashboard");
          } else {
            navigate("/services");
          }
        } else {
          alert("Invalid credentials ❌");
        }
      })
      .catch(() => alert("Server error ❌"));
  };

  return (
    <div style={styles.container}>
      <h2>Login 🔐</h2>

      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        style={styles.input}
      />

      <button onClick={login} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
    color: "white"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#1e293b",
    color: "white"
  },
  button: {
  background: "linear-gradient(45deg, #22c55e, #38bdf8)",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
}
};

export default Login;