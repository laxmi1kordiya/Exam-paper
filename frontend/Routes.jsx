import React, { Suspense } from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import Features from "./Pages/Features";
import Login from "./Pages/login";
import Price from "./Pages/Price";
import HowToUse from "./Pages/HowToUse";
import MyDashboard from "./Pages/admin/MyDashboard";
import GeneratePaper from "./Pages/admin/GeneratePaper";
import AdminLayout from "./Pages/admin/AdminLayout";
import PurchasePackage from "./Pages/admin/PurchasePackage";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import GenerateBoard from "./Pages/formData/GenerateBoard";

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactRouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/packages" element={<Price />} />
        <Route path="/howtouse" element={<HowToUse />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/board" element={<GenerateBoard />} />
           
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<MyDashboard />} />
          <Route path="my-dashboard" element={<MyDashboard />} />
          <Route path="generate-paper" element={<GeneratePaper />} />
          <Route path="purchase-package" element={<PurchasePackage />} />
        </Route>
      </ReactRouterRoutes>
    </Suspense>
  );
};

export default Routes;
