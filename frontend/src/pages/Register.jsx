import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

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
      <h2>Register 🚀</h2>

      <input placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />

      <select onChange={(e) => setData({ ...data, role: e.target.value })}>
        <option value="customer">Customer</option>
        <option value="freelancer">Freelancer</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}

const styles = {
  container: { padding: "40px", maxWidth: "400px", margin: "auto" }
};

export default Register;