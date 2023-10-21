import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

const EmpHome = () => {
  const { providerInfo } = useSelector((state) => state.employee);
  const providerId = providerInfo.provider._id;
  const socket = io('http://localhost:5000');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.emit('join-provider-room', providerId);

    socket.on('new-booking-for-provider', (data) => {
      const newBooking = data.booking;
      console.log(newBooking,">>>>>>>>>>>>>>>>>>>>")

      if (newBooking.status !== 'accepted' && !requests.find((booking) => booking._id === newBooking._id)) {
        setRequests((prevRequests) => [...prevRequests, newBooking]);
      }
    });

    socket.on('test-message-response', (data) => {
      console.log('Received response from server:', data);
    });

    return () => {
      socket.off('new-booking-for-provider');
    };
  }, [providerId]);

  const handleAccept = (bookingId) => {
    console.log(bookingId,"'>>>>>>>>>>>>>>.")
    axios
      .put(`http://localhost:5000/boookings/accept/${bookingId}`, {
        providerId,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success('Booking accepted');

          const updatedRequests = requests.filter((booking) => booking._id !== bookingId);
          setRequests(updatedRequests);
        }
      })
      .catch((error) => {
        console.error('Error accepting booking:', error);
      });
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Booking List</h2>
        {requests.length === 0 ? (
          <div className="flex justify-center mt-10 ">
            <p className="uppercase font-semibold text-lg">No bookings available at the moment.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((booking, index) => (
              <li key={index + 1} className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-2">
               {booking.userId}
               {booking.Total}

                <div className="flex justify-between mt-3">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleAccept(booking._id)}
                  >
                    Accept
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default EmpHome;
