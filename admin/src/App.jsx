import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import ADD from "./components/ADD";
import "./App.css";
import AddService from "./components/AddService";
import AllCategroy from "./components/AllCategroy";

import AllService from "./components/AllService";
import AllUsers from "./components/AllUsers";
import Requests from "./components/Requests";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import AllProviders from "./components/AllProviders";
import CouponList from "./components/Pages/CouponList";

import AdminReports from "./components/Pages/Report";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Bar from "./components/Dashboard/BarChart";
import PieChart from "./components/Dashboard/PieChart";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<AdminLogin />}></Route>
            <Route path="/dashboard" element={<AdminHome />}></Route>
            <Route path="/add" element={<ADD />}></Route>
            <Route path="/service" element={<AddService />}></Route>
            <Route path="/ser" element={<AllService />}></Route>
            <Route path="/categories" element={<AllCategroy />}></Route>
            <Route path="/users" element={<AllUsers />}></Route>
            <Route path="/requests" element={<Requests />}></Route>
            <Route path="/providers" element={<AllProviders />}></Route>
            <Route path="/coupons" element={<CouponList />} />

            <Route path="/reports" element={<AdminReports />} />

            <Route path="/dash" element={<AdminDashboard/>}/>
            <Route path="/dashe" element={  <Bar />}/>
          </Routes>
        </Router>
      </PrimeReactProvider>
    </>
  );
}

export default App;
