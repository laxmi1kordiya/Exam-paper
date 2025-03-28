import React, { Suspense, lazy} from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

const SignUp = lazy(() => import("../frontend/Pages/SignUp"));


const Routes = () => {
  return (
    <React.Fragment>
      <Suspense>
        <ReactRouterRoutes>
            <Route path="/signUp" element={<SignUp />} />
        </ReactRouterRoutes>
      </Suspense>
    </React.Fragment>
  );
};

export default Routes;
