import React from "react";
import Navbar from "./Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-100 h-auto p-4 md:p-10 mt-10">
        <div className="bg-white h-1/2 rounded-2xl p-4 md:p-8">
          <div className="bg-slate-200  md:h-60 w-full rounded-lg flex flex-col md:flex-row items-center">
            <img
              className="bg-yellow-600 rounded-full w-60 h-56 mt-4 md:mt-1 ml-4 md:ml-6"
              src="https://wallpapers.com/images/hd/luffy-1270-x-1270-picture-q8034d16y33oz5yc.jpg"
              alt="Profile"
            />
            <div className="mt-4 md:mt-0 md:ml-10">
              <button type="" className="btn btn-primary w-full md:w-44">
                Upload New Photo
              </button>
             
            </div>
          </div>
          <div className="bg-slate-200 h-36 w-full md:h-80 rounded-3xl mt-5">
            <div className="flex justify-between  ">
              <h1 className="text-black font-semibold ml-5 mt-4 text-lg">
                Personal Info
              </h1>
              <button className="w-28 h-7 mr-3 bg-white rounded-lg mt-5 ">
                Edit ?
              </button>
            </div>
            <div className="bg-slate-100 mt-4 h-64  rounded-xl flex justify-evenly   ">
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="text-">Email</h1>
                <input
                  className="w-48  rounded-xl h-10 mt-3  "
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="">Name</h1>
                <input
                  className="w-48  rounded-xl h-10 mt-3 "
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="">Mobile</h1>
                <input
                  className="w-48  rounded-xl h-10 mt-3  "
                  type="text"
                  name=""
                  id=""
                />
              </div>

             

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
