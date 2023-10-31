import React, { useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, title: 'Product 1', price: 50, image: 'product1.jpg' },
    { id: 2, title: 'Product 2', price: 75, image: 'product2.jpg' },
    { id: 3, title: 'Product 3', price: 100, image: 'product3.jpg' },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleCheckout = (item) => {
    // Add your checkout logic here
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h2>
                <p className="text-gray-600 text-lg mb-4">${item.price}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full transition duration-300"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleCheckout(item)}
                    className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full transition duration-300"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {wishlist.length === 0 && (
          <p className="text-center mt-8 text-gray-600 text-2xl">
            Your wishlist is empty. Start adding items you love!
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
