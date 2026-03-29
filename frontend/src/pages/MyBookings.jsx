import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

function MyBookings() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/book`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>My Orders 📦</h2>

      {orders.map(o => (
        <div key={o.id} style={{ marginBottom: "15px" }}>
          <h4>{o.serviceName}</h4>
          <p>Status: {o.status}</p>

          {o.status === "COMPLETED" && (
            <button onClick={() => navigate("/payment", { state: o })}>
              Pay & Review 💳
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;