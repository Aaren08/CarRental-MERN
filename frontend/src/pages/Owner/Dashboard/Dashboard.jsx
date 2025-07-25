import { useEffect, useState } from "react";
import Title from "../../../components/Owner/Title/Title.jsx";
import { dummyDashboardData, assets } from "../../../assets/assets.js";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  return (
    <div className="owner-dashboard">
      <Title
        title={"Admin Dashboard"}
        subtitle={
          "Monitor overall platform performance including total cars, bookings, revenue and recent activities."
        }
      />

      <div className="owner-dashboard-cards">
        {dashboardCards.map((card, index) => (
          <div key={index} className="owner-dashboard-card">
            {/* TITLE */}
            <div className="owner-dashboard-card-title">
              <h1>{card.title}</h1>
              <p>{card.value}</p>
            </div>

            {/* ICON */}
            <div className="owner-dashboard-card-icon">
              <img src={card.icon} alt="icon" />
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITIES SECTION --> RECENT BOOKINGS AND MONTHLY REVENUE */}
      <div className="owner-dashboard-recent-activities">
        {/* RECENT BOOKINGS */}
        <div className="owner-dashboard-recent-bookings">
          <h1>Recent Bookings</h1>
          <p>Latest customer bookings</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="owner-dashboard-recent-booking">
              <div className="owner-dashboard-recent-booking-info">
                {/* BOOKING ICON */}
                <div className="owner-dashboard-recent-booking-icon">
                  <img src={assets.listIconColored} alt="icon" />
                </div>

                {/* CARS BRAND & MODEL NAME */}
                <div className="owner-dashboard-recent-booking-date">
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p>{booking.createdAt.split("T")[0]}</p>
                </div>
              </div>

              {/* BOOKING STATUS */}
              <div className="owner-dashboard-recent-booking-status">
                <p>
                  {currency}
                  {booking.price}
                </p>
                <p>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MONTHLY REVENUE */}
        <div className="owner-dashboard-monthly-revenue">
          <h1>Monthly Revenue</h1>
          <p>Revenue for current month</p>
          <p>
            {currency} {data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
