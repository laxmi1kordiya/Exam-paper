import React, { useEffect, useState } from "react";
import NotAuthorized from "./NotAuthorized";
import { useAuthenticatedFetch } from "./Api/Axios";

const AdminRoute = ({ children }) => {
  const fetch = useAuthenticatedFetch();
  const [verifiedType, setVerifiedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const res = await fetch.get("getUserData");
        setVerifiedType(res?.data?.type);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchUserType();
  }, []);

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="spinner"></div>
        <p className="text">Checking Admin Access...</p>
      </div>
    );
  }

  if (localStorage.getItem("type") !== "admin" || verifiedType !== "admin") {
    return <NotAuthorized />;
  }

  return children;
};

export default AdminRoute;
