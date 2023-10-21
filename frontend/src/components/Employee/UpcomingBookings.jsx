import React from 'react';

const UpcomingBookings = () => {
  // Sample data for upcoming bookings
  const upcomingBookings = [
    {
      id: 1,
      date: '2023-10-25',
      username: 'John Doe',
      serviceName: 'Service A',
    },
    {
      id: 2,
      date: '2023-11-02',
      username: 'Jane Smith',
      serviceName: 'Service B',
    },
    // Add more bookings as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Upcoming Bookings</h2>

      {upcomingBookings.length === 0 ? (
        <p className="text-lg text-gray-600">No upcoming bookings at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {upcomingBookings.map((booking) => (
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
                <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none">
                  Cancel Booking
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingBookings;
