import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileModal from "../components/USer/ProfileModal";
import { FaRupeeSign } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [modal, showModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const profileLoad = async () => {
      const res = await axios.get(`http://localhost:5000/users/profile/${id}`);
      setProfile(res.data);
      console.log(res, ">>>>>>>>>>>>>>>>>>>>");
    };
    profileLoad();
  }, []);

  const handleEdit = async (id) => {
    showModal(true);
    console.log(id);
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-100 h-auto p-4 md:p-10 mt-10">
        <div className="bg-white h-1/2 rounded-2xl p-4 md:p-8">
          <div className="bg-slate-200  md:h-60 w-full rounded-lg flex flex-col md:flex-row items-center">
            <img
              className="bg-yellow-600 rounded-full w-60 h-56 mt-4 md:mt-1 ml-4 md:ml-6"
              src={profile.profileimage}
              alt="Profile"
            />
            <div className="mt-4 md:mt-0 md:ml-10 w-3/5">
              <button type="" className="btn btn-primary w-full md:w-44">
                Upload New Photo
              </button>
            </div>
            <div className=" w-2/5 h-full flex justify-center items-center">
            <h1 className="text-lg font-semibold flex items-center">
                <FaRupeeSign className="mr-2" /> Wallet Balance:
                <span className="text-indigo-600 ml-1">
                  {profile.Wallet}
                </span>
              </h1>

            </div>
          </div>
          <div className="bg-slate-200 h-36 w-full md:h-80 rounded-3xl mt-5">
            <div className="flex justify-between  ">
              <h1 className="text-black font-semibold ml-5 mt-4 text-lg">
                Personal Info
              </h1>
              <button
                onClick={() => handleEdit(profile._id)}
                className="w-28 h-7 mr-3 bg-white rounded-lg mt-5 "
              >
                Edit
              </button>
            </div>
            <div className="bg-slate-100 mt-4 h-64  rounded-xl flex justify-evenly   ">
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="text-">Email</h1>
                <input
                  className="w-48  rounded-xl h-10 mt-3  "
                  type="text"
                  name="profile"
                  id=""
                  value={profile.email}
                />
              </div>
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="">Name</h1>
                <input
                  className="w-48  rounded-xl h-10 mt-3 "
                  type="text"
                  name="name"
                  id=""
                  value={profile.name}
                />
              </div>
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="">Mobile</h1>
                <input
                  className="w-48  rounded-xl h-10 mt-3  "
                  type="text"
                  name=""
                  id=""
                  value={profile.mobile}
                />
              </div>
              {modal && (
                <ProfileModal
                  profile={profile}
                  onclose={() => showModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
