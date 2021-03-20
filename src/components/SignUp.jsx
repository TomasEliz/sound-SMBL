import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/auth-sections.css";

const SignUp = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { signUp } = useAuth();
  const inputRef = useRef();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      return setErr("Passwords do not match");
    }
    try {
      setErr("");
      setLoading(true);
      await signUp(user.email, user.password);
      setLoading(false);
      props.history.push("/");
    } catch {
      setErr("Failed to create a profile");
      setLoading(false);
    }
  };

  useEffect(() => inputRef.current.focus(), []);

  return (
    <main onClickCapture={() => setShowModal(false)} className="main-auth">
      <section id="disclaimer" className="disclaimer">
        {err && <h2>{err}</h2>}
      </section>
      <form className="main-auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={handleChange}
          value={user.email}
          className="main-auth-form-input"
          name="email"
          ref={inputRef}
          placeholder="Email"
          autoComplete="off"
          spellCheck="false"
        />
        <input
          type="password"
          onChange={handleChange}
          value={user.password}
          className="main-auth-form-input"
          name="password"
          placeholder="Password"
          autoComplete="off"
          spellCheck="false"
        />
        <input
          type="password"
          onChange={handleChange}
          value={user.confirmPassword}
          className="main-auth-form-input"
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="off"
          spellCheck="false"
        />
        <button disabled={loading}>Sign Up</button>
        <div className="main-auth-form-link">
          Or <Link to="/login">log In</Link> to your profile
        </div>
      </form>
      <Footer showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
};

export default SignUp;
