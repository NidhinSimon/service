import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddressModal = ({ setSelectedAddress, onClose }) => {
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;

  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users/addresses/${userId}`
      );
      setAddresses(res.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSubmit = async () => {
    onClose();
  };

  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="relative bg-white rounded-lg shadow dark-bg-gray-700">
          <div className="p-4">
            <h2>Select an Address</h2>
            <ul>
              {addresses.map((address) => (
                <li key={address._id}>
                  <label>
                    <input
                      type="radio"
                      name="selectedAddress"
                      onChange={() => handleAddress(address.address)}
                    />
                    {address.address}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
