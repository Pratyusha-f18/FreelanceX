import { useEffect, useState } from "react";
import BASE_URL from "../config";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/book`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Orders 📦</h2>

      {orders.map((o) => (
        <div key={o.id} style={styles.card}>
          <h3>{o.serviceName}</h3>
          <p>{o.customerName}</p>
          <p>Status: {o.status}</p>
          <p>⭐ {o.rating}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgba(56,189,248,0.2)",
  transition: "0.3s",
  color: "white"
}
};

export default MyOrders;