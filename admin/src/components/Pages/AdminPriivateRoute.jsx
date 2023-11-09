import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
  const { adminInfo } = useSelector((state) => state.admin);
  return adminInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminPrivateRoute;
