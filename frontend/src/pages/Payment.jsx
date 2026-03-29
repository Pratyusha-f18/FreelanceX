import { useLocation } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../config";

function Payment() {
  const { state } = useLocation();
  const [name, setName] = useState("");

  if (!state) return <h2>No Booking Found ❌</h2>;

  const payNow = () => {
    alert("Processing Payment... 💳");

    setTimeout(() => {
      alert("Payment Successful ✅");

      const rating = prompt("Rate (1-5 ⭐)");
      const comment = prompt("Write review ✍️");

      fetch(`${BASE_URL}/book/${state.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "PAID",
          rating,
          comment
        })
      }).then(() => {
        alert("Payment + Review Submitted ✅");
      });

    }, 1500);
  };

  return (
    <div style={styles.container}>
      <h2>Payment Page 💳</h2>

      <div style={styles.card}>
        <h3>{state.serviceName}</h3>
        <p>Status: {state.status}</p>
      </div>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <button onClick={payNow} style={styles.button}>
        Pay Now 💳
      </button>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "500px", margin: "auto" },
  card: { background: "white", padding: "15px", borderRadius: "10px" },
  input: { width: "100%", padding: "10px", marginTop: "10px" },
  button: { marginTop: "20px", padding: "10px", background: "#1dbf73", color: "white" }
};

export default Payment;