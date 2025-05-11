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
import PaperSetting from "./Pages/admin/PaperSetting";
import EducationManager from "./Pages/formData/GenerateTable";
import QuestionTable from "./Pages/formData/QuestionTable";
import MyPapers from "./Pages/admin/MyPapers";
import HowToUses from "./Pages/admin/HowToUse";
import Syllabus from "./Pages/admin/syllabus";
import Blueprint from "./Pages/admin/Blueprint";

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
        <Route path="/table" element={<EducationManager />} />
        <Route path="/questionTable" element={<QuestionTable />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<MyDashboard />} />
          <Route path="my-dashboard" element={<MyDashboard />} />
          <Route path="generate-paper" element={<GeneratePaper />} />
          <Route path="paper-setting" element={<PaperSetting />} />
          <Route path="purchase-package" element={<PurchasePackage />} />
          <Route path="my-papers" element={<MyPapers />} />
          <Route path="how-to-use" element={<HowToUses />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="blueprint" element={<Blueprint />} />
        </Route>
      </ReactRouterRoutes>
    </Suspense>
  );
};

export default Routes;
