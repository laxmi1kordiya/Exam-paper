import React, { Suspense, lazy} from "react";
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
const SignUp = lazy(() => import("../frontend/Pages/SignUp.jsx"));
const Home = lazy(() => import("../frontend/Pages/Home.jsx"));


const Routes = () => {
  return (
    <React.Fragment>
      <Suspense>
        <ReactRouterRoutes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/features" element={<Features />} />
            <Route path="/packages" element={<Price />} />
            <Route path="/howtouse" element={<HowToUse />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/my-dashboard" element={<MyDashboard />} />
            <Route path="/generate-paper" element={<GeneratePaper />} />
            <Route path="/purchase-package" element={<PurchasePackage />} />
            <Route path="/" element={<Home />} />
        </ReactRouterRoutes>
      </Suspense>
    </React.Fragment>
  );
};

export default Routes;
