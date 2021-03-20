import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import Footer from "./Footer";
import Modal from "react-modal";
import MarkedEventsList from "./MarkedEventsList";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { customModal } from "../css/customStyles/customStyles";
import "../css/profile-page.css";

Modal.setAppElement("#root");

const ProfilePage = () => {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const initStats = {
    artists: false,
    albums: false,
    events: false,
  };
  const [statsModal, setStatsModal] = useState(initStats);
  const history = useHistory();
  const { currentUser } = useAuth();
  const eventList = useSelector(
    (state) => state.eventsListReducer.plannedEvents
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push({ pathname: "/infopage", state: text });
  };
  const handleSetStatsModal = (e) => {
    setStatsModal({ ...initStats, [e.target.title]: true });
  };
  const closeStatsModal = () => {
    Object.keys(initStats).forEach((key) =>
      setStatsModal({ ...initStats, [key]: false })
    );
  };

  return (
    <main
      onClickCapture={() => showModal && setShowModal(false)}
      className="profile"
    >
      <ProfileHeader />
      <Modal
        isOpen={statsModal.events}
        onRequestClose={closeStatsModal}
        style={customModal}
      >
        <MarkedEventsList />
      </Modal>
      <section className="profile-dashboard">
        <ul className="profile-dashboard-ul">
          <li className="profile-dashboard-ul-li">
            <label>Username:</label>
            <p>{currentUser.email.slice(0, currentUser.email.indexOf("@"))}</p>
            <button>Change username</button>
          </li>
          <li className="profile-dashboard-ul-li">
            <label>Email:</label>
            <p>{currentUser.email}</p>
            <button>Change email</button>
          </li>
          <li className="profile-dashboard-ul-li">
            <Link to="/changepassword">Change password</Link>
          </li>
        </ul>
        <ul className="profile-dashboard-ul">
          <li className="profile-dashboard-ul-li">
            <label>Followed artists:</label>
            <h3>0</h3>
          </li>
          <li className="profile-dashboard-ul-li">
            <label>Favorite albums:</label>
            <h3>0</h3>
          </li>
          <li className="profile-dashboard-ul-li">
            <label>Marked events:</label>
            {eventList.length > 0 ? (
              <Link
                to="#"
                onClick={handleSetStatsModal}
                className="stats-link"
                title="events"
              >
                {eventList.length}
              </Link>
            ) : (
              <h3>0</h3>
            )}
          </li>
        </ul>
      </section>
      <form onSubmit={handleSubmit} className="profile-form">
        <h1>Search</h1>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="profile-form-input"
          placeholder="artist name"
          autoComplete="off"
          spellCheck="false"
        />
        <button className="profile-form-button">Go</button>
      </form>
      <Footer showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
};

export default ProfilePage;
