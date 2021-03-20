import React, { useState, useRef } from "react";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../css/search-page.css";

const SearchPage = () => {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const artistData = useSelector((state) => state.artistDataReducer.artistData);
  const inputRef = useRef();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push({pathname: '/infopage', state: text})
  };


  return (
    <main
      onClickCapture={() => showModal && setShowModal(false)}
      className="main-initial"
    >
      <section className="disclaimer">
        {!artistData === null && (
          <h2>Sorry, we couldn't find the artist :(</h2>
        )}
      </section>
      <form onSubmit={handleSubmit} className="main-initial-form">
        <h1>Search</h1>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="main-initial-form-input"
          placeholder="artist name"
          autoComplete="off"
          spellCheck="false"
        />
        <button className="main-initial-form-button">Go</button>
      </form>
      <Footer showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
};

export default SearchPage;
