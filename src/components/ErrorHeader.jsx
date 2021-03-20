import React, { useState } from "react";
import { setArtistData } from "../actions/artistDataActions";
import { useDispatch } from "react-redux";
import { artistURL } from "../urls/urls";
import { Link } from "react-router-dom";
import "../css/header.css";

const ErrorHeader = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setArtistData(artistURL, text));
  };

  return (
    <header className="header">
      <form onSubmit={handleSubmit} className="header-form">
        <h4 className="header-form-label">Search</h4>
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="header-form-input"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
      <ul className="nav-ul">
        <li className="nav-ul-li"><Link to='/' >Profile</Link></li>
      </ul>
      <div className="header-user-icon">
        <p>logged in as:</p>
        <h3 className="header-user-icon-name">Test Name</h3>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default ErrorHeader;
