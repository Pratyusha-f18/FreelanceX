import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const navigate = useNavigate();

  const register = () => {
    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        alert("Registered Successfully ✅");
        navigate("/login");
      })
      .catch(() => alert("Error ❌"));
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Register 🚀</h2>

        <input
          placeholder="Name"
          style={styles.input}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          style={styles.input}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <select
          style={styles.input}
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value.toLowerCase() })}
        >
          <option value="customer">Customer</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <button style={styles.button} onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px",
    color: "#1e293b"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1dbf73",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Register;