import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UpcomingBookings from './UpcomingBookings';
import AllBookings from './AllBookings';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="text-center text-2xl font-bold py-4">Provider Bookings</header>
      <nav className="flex justify-center space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            activeTab === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('upcoming')}
        >
          Upcoming Bookings
        </button>
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('all')}
        >
          All Bookings
        </button>
      </nav>
      {activeTab === 'upcoming' ? <UpcomingBookings /> : <AllBookings />}
    </div>
  );
};

export default Bookings;
