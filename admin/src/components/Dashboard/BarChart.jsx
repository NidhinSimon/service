import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const Bar = () => {
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    // Fetch admin earnings data from your backend
    fetch('http://localhost:7000/admin/getmonths')
      .then((response) => response.json())
      .then((data) => {
        setEarnings(data.earnings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const data = {
    labels: ['Earnings', 'Remaining'],
    datasets: [{
      data: [earnings, 1000 - earnings], // Assuming 1000 is the total amount
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(169, 169, 169)'],
      hoverOffset: 4
    }]
  };

  return (
    <div>
      <Doughnut data={data}  />
    </div>
  );
};

export default Bar;
