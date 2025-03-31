import React, { Suspense, lazy} from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import Features from "./Pages/Features";
import Login from "./Pages/login";
import Price from "./Pages/Price";
const SignUp = lazy(() => import("../frontend/Pages/SignUp"));
const Home = lazy(() => import("../frontend/Pages/Home"));


const Routes = () => {
  return (
    <React.Fragment>
      <Suspense>
        <ReactRouterRoutes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/features" element={<Features />} />
            <Route path="/packages" element={<Price />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/" element={<Home />} />
        </ReactRouterRoutes>
      </Suspense>
    </React.Fragment>
  );
};

export default Routes;
