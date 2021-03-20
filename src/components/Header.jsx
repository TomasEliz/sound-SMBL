import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/header.css";

const Header = ({ artist }) => {
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({ pathname: "/infopage", state: text });
  };
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
    <header className="header">
      <form onSubmit={handleSubmit} className="header-form">
        <h4 className="header-form-label">Search artist</h4>
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="header-form-input"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
      {err && <h2>Failed to logout</h2>}
      {artist && (
        <ul className="nav-ul">
          <li className="nav-ul-li">
            <Link
              to={{ pathname: "/infopage", state: artist && artist.strArtist }}
            >
              Info
            </Link>
          </li>
          <li className="nav-ul-li">
            <Link to={{ pathname: "/discography", state: artist }}>
              Discography
            </Link>
          </li>
          <li className="nav-ul-li">
            <Link to={{ pathname: "/eventspage", state: artist }}>Events</Link>
          </li>
        </ul>
      )}
      <div className="header-user-icon">
        <p>logged in as:</p>
        <Link
          to={{ pathname: "/", state: artist }}
          className="header-user-icon-name"
        >
          {currentUser.email.slice(0, currentUser.email.indexOf("@"))}
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
