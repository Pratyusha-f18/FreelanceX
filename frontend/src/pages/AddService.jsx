import { useState } from "react";
import { BASE_URL } from "../config";

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
    return <h2 style={{ textAlign: "center", color: "white" }}>Only Freelancers can add services ❌</h2>;
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
      <h2>Add New Service ➕</h2>

      <input placeholder="Title" value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })} />

      <input placeholder="Description" value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })} />

      <input placeholder="Price" value={data.price}
        onChange={(e) => setData({ ...data, price: e.target.value })} />

      <input placeholder="Image URL" value={data.imageUrl}
        onChange={(e) => setData({ ...data, imageUrl: e.target.value })} />

      <input placeholder="Rating" value={data.rating}
        onChange={(e) => setData({ ...data, rating: e.target.value })} />

      <button onClick={submit}>Add Service</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "auto",
    color: "white"
  }
};

export default AddService;