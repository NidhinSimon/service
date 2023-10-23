import React, { useState, useEffect } from 'react';
import Navbar from '../../Pages/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('accepted'); 
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/bookings/${userId}`);
      console.log(response, '>>>>');
      if (response.status === 200) {
        setBookings(response.data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterBookings = (status) => {
    if (status === 'all') {
      return bookings;
    } else {
      return bookings.filter((booking) => booking.status.toLowerCase() === status.toLowerCase());
    }
  };

  const handleCancel=async(id)=>{
    console.log(id,'>>')
    const res=await axios.post(`http://localhost:5000/users/canceluser/${id}`)
    console.log(res,">>>>>>>>>>>>>")
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-4 rounded-md shadow-md mt-16">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        <div className="flex space-x-4 mb-4">
          {/* Tabs for switching between accepted, upcoming, and canceled bookings */}
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'accepted' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab('accepted')}
          >
           Upcoming
          </button>
         
        
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">You have no bookings yet.</p>
        ) : (
          <ul className="space-y-4">
            {filterBookings(activeTab).map((booking) => (
              <li
                key={booking._id}
                className={`p-4 rounded-md shadow-md flex justify-between items-center ${
                  booking.status === 'accepted'
                    ? 'bg-green-100'
                    : booking.status === 'upcoming'
                    ? 'bg-blue-100'
                    : 'bg-red-100'
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
                  <p className="text-gray-600">Date: {booking.date}</p>

                  <p className="text-gray-600">Address: {booking.address}</p>
                 Total: <button className="btn btn-active btn-ghost">{booking.Total}</button>
                </div>
                <div className="space-x-4">


                  {booking.status === 'accepted' && (
                    <button onClick={()=>handleCancel(booking._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover-bg-red-600">
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UserBookings;
