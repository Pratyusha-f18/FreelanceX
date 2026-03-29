import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/book`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const markCompleted = (id) => {
    fetch(`${BASE_URL}/book/${id}/complete`, {
      method: "PUT"
    }).then(() => {
      alert("Marked Completed ✅");

      setOrders(orders.map(o =>
        o.id === id ? { ...o, status: "COMPLETED" } : o
      ));
    });
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>Freelancer Dashboard 📊</h2>

      {orders.map(o => (
        <div key={o.id}>
          {o.serviceName} - {o.status}

          {o.status === "PENDING" && (
            <button onClick={() => markCompleted(o.id)}>
              Mark Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;