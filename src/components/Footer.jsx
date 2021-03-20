import React, { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import "../css/footer.css";

const Footer = ({ showModal, setShowModal }) => {
  const [displayFooter, setDisplayFooter] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleDisplayFooter = () => {
    displayFooter ? setDisplayFooter(false) : setDisplayFooter(true);
  };

  return (
    <footer className="footer">
      <span onClick={handleDisplayFooter} id="footer-span">
        {displayFooter ? (
          <MdKeyboardArrowUp className="footer-icon footer-arrow" />
        ) : (
          <MdKeyboardArrowDown className="footer-icon footer-arrow" />
        )}
      </span>
      <article className={showModal ? "show-modal" : "hide"}>
        <ul className="info-modal-ul">
          <li>Login or sign up to create new account</li>
          <li>Use search to learn more about your favorite artists</li>
          <li>Browse discographies or find out about upcoming events</li>
          <li>
            Save interesting events to your profile, follow bands, mark favorite
            albums
          </li>
        </ul>
        <strong>(Site is work in progress!)</strong>
      </article>
      <div className={displayFooter ? "footer-wrapper" : "footer-wrapper-hide"}>
        <div
          className={
            displayFooter ? "footer-container" : "footer-container-hide"
          }
        >
          <p>© Tomas Eliz {currentYear}</p>
          <FaInfoCircle
            onClickCapture={() => setShowModal(!showModal)}
            className="footer-icon"
          />
          <a
            href="https://github.com/TomasEliz"
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin className="footer-icon" />
          </a>

          <a
            href="https://www.linkedin.com/in/tomas-eliz-353260208/"
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub className="footer-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
