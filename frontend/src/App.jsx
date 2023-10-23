import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./Pages/LoginScreen";
import RegisterScree from "./Pages/RegisterScree";
import UserHome from "./Pages/UserHome";
import "daisyui/dist/full.css";
import MapWithGeocoding from "./Pages/Otp";
import ServiceDetailpage from "./Pages/ServiceDetailpage";
import Juju from "./components/Employee/juju";
import PrivateRoute from "./Pages/PrivateRoute";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Login from "./components/Employee/Login";
import ServiceCard from "./Pages/ServiceCard";

import Final from "./Pages/Final";
import Checkout from "./Pages/Checkout";
import EmpHome from "./components/Employee/EmpHome";
import Profile from "./Pages/Profile";
import Spinner from "./components/Employee/Spinner";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EmployeeSignup from "./components/Employee/EmployeeSignup";
import Success from "./Pages/Success";
import Notfound from "./Pages/Notfound";
import Bookings from "./components/Employee/Bookings";
import UpcomingBookings from "./components/Employee/UpcomingBookings";
import AllBookings from "./components/Employee/AllBookings";
import UserBookings from "./components/USer/UserBookings";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PrimeReactProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScree />} />
            <Route path="/map" element={<MapWithGeocoding />} />
            <Route path="/ji" element={<Juju />} />
            <Route path="/empregister" element={<EmployeeSignup />} />
            <Route path="/empHome" element={<EmpHome />} />
            <Route path="/i" element={<Final />} />
            <Route path="/emplogin" element={<Login />} />

            <Route path="/notfound" element={<Notfound />}></Route>

            <Route path="/*" element={<Navigate to="/notfound" replace />} />
            <Route path="/success" element={<Success />}></Route>
            <Route path="/provider/upcoming" element={<UpcomingBookings />} />
            <Route path="/provider/all" element={<AllBookings />} />

            <Route path="/bookings" element={<UserBookings />} />
            <Route path="/empbookings" element={<Bookings />} />

            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/home" element={<UserHome />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/service/:id" element={<ServiceDetailpage />} />
            </Route>
          </Routes>
        </Router>
      </PrimeReactProvider>
    </LocalizationProvider>
  );
}

export default App;
