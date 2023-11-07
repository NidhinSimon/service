import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import { Tooltip, Title, ArcElement, Legend } from "chart.js";
import Bar from "./BarChart";
import PieChart from "./PieChart";
ChartJS.register(Tooltip, Title, ArcElement, Legend);

const AdminDashboard = () => {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    // Fetch admin statistics from the backend
    fetch("http://localhost:7000/admin/stats")
      .then((response) => response.json())
      .then((data) => setAdminStats(data))
      .catch((error) =>
        console.error("Error fetching admin statistics: ", error)
      );
  }, []);

  //   const labels = Utils.months({count: 7});
  //   const data = {
  //     labels: labels,
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //       tension: 0.1
  //     }]
  //   };

  return (
    <>
      <Navbar />
      <div className="bg-blue-300  ">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">Total Bookings</h2>
              <p className="flex justify-center text-xl font-semibold">{adminStats.totalBookings}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">Users</h2>
              <p className="flex justify-center text-xl font-semibold">{adminStats.totalUsers}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">Booking Total </h2>
              <p className="flex justify-center text-xl font-semibold">₹{adminStats.totalEarnings}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">Providers</h2>
              <p className="flex justify-center text-xl font-semibold">{adminStats.totalProviders}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow mt-4  h-screen">
            <h2 className="text-xl font-semibold mb-2">Booking Chart</h2>
            <div className="flex justify-center items-center h-full w-full" style={{width:"100%",height:"400px"}}>
            
              <PieChart  /> 
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
