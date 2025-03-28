import React, { Suspense, lazy} from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

const SignUp = lazy(() => import("../frontend/Pages/SignUp"));
const Home = lazy(() => import("../frontend/Pages/Home"));


const Routes = () => {
  return (
    <React.Fragment>
      <Suspense>
        <ReactRouterRoutes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/" element={<Home />} />
        </ReactRouterRoutes>
      </Suspense>
    </React.Fragment>
  );
};

export default Routes;
