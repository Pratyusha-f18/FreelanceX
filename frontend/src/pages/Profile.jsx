function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <h2 style={{ color: "white" }}>Please login ❗</h2>;

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>Profile 👤</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Profile;