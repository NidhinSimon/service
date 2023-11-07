import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bookings",
        data: [],
        some:[],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/admin/bookings-month"
        );
        const responseData = response.data;

        const labels = responseData.map((item) => item.serviceName);
        const data = responseData.map((item) => item.Total);
        const some=responseData.map((item) => item.address);
        const backgroundColor = responseData.map((item, index) => {
          const colors = [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ];
          return colors[index % colors.length];
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Amount",
              data,
              some,
              backgroundColor,
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <Pie data={chartData} />;
};

export default PieChart;
