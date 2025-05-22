import React, { useState, useCallback, useEffect } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { navigate } from "../../Components/NavigationMenu";
import { useLocation } from "react-router-dom";
import { femaleIcon, maleIcon } from "../../Assets";
import { FiUser, FiLogOut } from "react-icons/fi";

const Header = () => {
  const setNavigate = navigate();
  const fetch = useAuthenticatedFetch();
  const [data, setData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [url, setUrl] = useState(false);
  const location = useLocation();

  const fetchData = useCallback(async () => {
    const res = await fetch.get("getUserData");
    setData(res.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const path = location.pathname;

    if (path === "/admin/generate-paper") {
      setUrl("Create Paper");
    } else if (path === "/admin/my-dashboard") {
      setUrl("Dashboard");
    } else if (path === "/admin/paper-setting") {
      setUrl("Paper Heading");
    } else if (path === "/admin/purchase-package") {
      setUrl("Plan Package");
    } else if (path === "/admin/my-papers") {
      setUrl("My Papers");
    } else if (path === "/admin/how-to-use") {
      setUrl("How To Use");
    } else {
      setUrl(""); 
    }
  }, [location.pathname]);

  const signOut = () => {
    setNavigate("/");
  };

  const getProfileIcon = () => {
    if (data?.gender === "Male") {
      return maleIcon;
    } else if (data?.gender === "Female") {
      return femaleIcon;
    }
  };
  return (
    <div className="top-nav">
      <div className="url">{url}</div>
      <div className="user-profile">
        <div
          onClick={() => setShowPopup(!showPopup)}
          className="profile-toggle"
        >
          <div className="user-avatar">
            {getProfileIcon() ? (
              <img src={getProfileIcon()} alt="Profile" />
            ) : (
              <FiUser size={20} />
            )}
          </div>
          <div className="profile-info">
            <div className="profile-name">{data?.name || "User"}</div>
            <div className="profile-type">{data?.type || "Type"}</div>
          </div>
        </div>

        {showPopup && (
          <div className="profile-popup">
            <div className="profile-popup-header">
              <div className="popup-greeting">Hello, {data?.name || "User"}</div>
              <div className="popup-type">{data?.type || "Type"}</div>
            </div>
            <button onClick={signOut} className="signout-button">
              <FiLogOut className="signout-icon" /> Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
