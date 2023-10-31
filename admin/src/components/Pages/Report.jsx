import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="p-10 ">
         <h1 className=" text-center font-semibold uppercase ">Reports</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
       
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10">

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Reporter Name
              </th>
              <th scope="col" className="px-6 py-3">
                Report Reason
              </th>
              <th scope="col" className="px-6 py-3">
                Provider Name
              </th>
             
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((req) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {req.reporterId.name}
                </th>
                <td className="px-6 py-4">{req.reportReason}</td>
                <td className="px-6 py-4">    {req.providerId.name}</td>
                {/* <td className="px-6 py-4">$2999</td> */}
                <td className="px-6 py-4">
                  <button className="text-red-600 uppercase font-semibold mr-4">
                    block
                  </button>
                  <button className="text-green-500 uppercase font-semibold">
                    reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default AdminReports;
