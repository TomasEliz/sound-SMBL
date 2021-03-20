import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/profile-header.css";

const ProfileHeader = () => {
  const [err, setErr] = useState("");
  const history = useHistory();
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    setErr("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setErr("failed to logout");
    }
  };

  return (
    <header className="profile-header">
      {err && <h2>Failed to logout</h2>}
      <div className="profile-header-user-icon">
        <p>logged in as:</p>
        <h3 className="header-user-icon-name">{currentUser.email.slice(0, currentUser.email.indexOf('@'))}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default ProfileHeader;
