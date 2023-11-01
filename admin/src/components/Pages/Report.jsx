import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import toast, { Toaster } from "react-hot-toast";

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

  const blockProvider = async (blockId) => {
    try {
      const res = await axios.put(`http://localhost:5000/block/${blockId}`);

      if (res.data.message === "provider blocked successfully") {
        toast.success("Provider blocked successfully");
        const updatedBlock = reports.map((i) =>
          i._id === blockId ? { ...i, isBlocked: true } : i
        );
        setReports(updatedBlock);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const rejectReport = async (reportId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/updateReportStatus/${reportId}`
      );
      if (res.data.message === "Report status updated successfully") {
        const updatedReports = reports.filter(
          (report) => report._id !== reportId
        );
        setReports(updatedReports);
        toast.success("Report rejected successfully");
      }
    } catch (error) {
      toast.error("Error rejecting report");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="p-10">
        {reports.length === 0 ? (
          <div className="text-center font-semibold">No Reports Found</div>
        ) : (
          <>
            <h1 className="text-center font-semibold uppercase text-3xl mb-5">
              Reports
            </h1>
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                    <tr
                      key={req._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {req.reporterId.name}
                      </td>
                      <td className="px-6 py-4">{req.reportReason}</td>
                      <td className="px-6 py-4">{req.providerId.name}</td>
                      <td className="px-6 py-4">
                        {req.providerId.isBlocked ? (
                          <span className="text-red-600 uppercase font-semibold">
                            Blocked
                          </span>
                        ) : (
                          <button
                            onClick={() => blockProvider(req.providerId._id)}
                            className="text-red-600 uppercase font-semibold mr-4"
                          >
                            Block
                          </button>
                        )}
                        <button
                          onClick={() => rejectReport(req._id)}
                          className="text-green-500 uppercase font-semibold ml-10"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminReports;
