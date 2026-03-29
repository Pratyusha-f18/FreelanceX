import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddService from "./pages/AddService";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh" }}>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />   {/* ✅ FIXED */}
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddService />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>

    </div>
  );
}

export default App;