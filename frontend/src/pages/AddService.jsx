import { useState } from "react";
import BASE_URL from "../config";

function AddService() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    rating: ""
  });

  if (!user || user.role !== "freelancer") {
    return (
      <h2 style={{ textAlign: "center", color: "white" }}>
        Only Freelancers can add services ❌
      </h2>
    );
  }

  const submit = () => {
    if (!data.title || !data.price) {
      alert("Title and Price are required ❗");
      return;
    }

    fetch(`${BASE_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...data,
        price: Number(data.price),
        rating: Number(data.rating)
      })
    })
      .then(() => {
        alert("Service Added ✅");
        setData({
          title: "",
          description: "",
          price: "",
          imageUrl: "",
          rating: ""
        });
      })
      .catch(() => alert("Error adding service ❌"));
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Add New Service ➕</h2>

        <input
          style={styles.input}
          placeholder="Title"
          value={data.title}
          onChange={(e) =>
            setData({ ...data, title: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Description"
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Price"
          value={data.price}
          onChange={(e) =>
            setData({ ...data, price: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Image URL"
          value={data.imageUrl}
          onChange={(e) =>
            setData({ ...data, imageUrl: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Rating"
          value={data.rating}
          onChange={(e) =>
            setData({ ...data, rating: e.target.value })
          }
        />

        <button style={styles.button} onClick={submit}>
          Add Service
        </button>
      </div>
    </div>
  );
}

// ✅ styles OUTSIDE function
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
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  title: {
    textAlign: "center",
    color: "#1e293b"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "12px",
    background: "#1dbf73",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default AddService;