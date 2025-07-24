import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/HomePage/Home.jsx";
import CarDetails from "./pages/CarDetailsPage/CarDetails.jsx";
import Cars from "./pages/CarsPage/Cars.jsx";
import MyBookings from "./pages/MyBookingsPage/MyBookings.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Layout from "./pages/Owner/Layout/Layout.jsx";
import Dashboard from "./pages/Owner/Dashboard/Dashboard.jsx";
import AddCar from "./pages/Owner/AddCar/AddCar.jsx";
import ManageCars from "./pages/Owner/ManageCars/ManageCars.jsx";
import ManageBookings from "./pages/Owner/ManageBookings/ManageBookings.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <div>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Owner layout and nested routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
