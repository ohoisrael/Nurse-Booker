import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Nurses from "../Pages/Nurses/Nurses";
import NurseDetails from "../Pages/Nurses/NurseDetails";
import Signup from "../Pages/Signup";
import Contact from "../Pages/Contact";

import Login from "../Pages/Login";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/nurse-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../Pages/CheckoutSuccess";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/nurses" element={<Nurses />} />
      <Route path="/nurses/:id" element={<NurseDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nurses/profile/me"
        element={
          <ProtectedRoute allowedRoles={["nurse"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
