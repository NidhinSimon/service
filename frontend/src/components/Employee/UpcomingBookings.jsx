import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { AddressAutofill } from "@mapbox/search-js-react";
import Booking from "../../../../server/models/BookingModel";
import toast, { Toaster } from "react-hot-toast";

const UpcomingBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  const { providerInfo } = useSelector((state) => state.employee);
  const providerId = providerInfo.provider._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/upcoming/${providerId}`)
      .then((response) => {
        const data = response.data;
        console.log(data, ">");
        setUpcomingBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching upcoming bookings:", error);
        setError("Failed to fetch upcoming bookings. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      console.log(bookingId, "...");
      const response = await axios.post(
        `http://localhost:5000/cancel/${bookingId}`
      );
      console.log(response, ">>>>>>>>>>>>>");
      if (response.data.success) {
        toast("Booking Cancelled Successfully", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        const updatedBookings = upcomingBookings.filter(
          (booking) => booking._id !== bookingId
        );
        setUpcomingBookings(updatedBookings);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("Failed to cancel the booking. Please try again later.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Toaster />
      <h2 className="text-3xl font-bold mb-4">Upcoming Bookings</h2>
      {loading ? (
        <Spinner />
      ) : error ? ( // Display an error message if there's an error
        <p className="text-lg text-red-600">{error}</p>
      ) : (
        <ul className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <p className="text-lg text-gray-600">
              No upcoming bookings at the moment.
            </p>
          ) : (
            upcomingBookings.map((booking) => (
              <li
                key={booking.id}
                className="bg-gray-100 p-4 rounded-lg flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-indigo-600">
                      {booking.serviceName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>User:</strong> {booking.username}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none"
                  >
                    Cancel Booking
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default UpcomingBookings;
