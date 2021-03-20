import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const inputRef = useRef();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await logIn(user.email, user.password);
      setLoading(false);
      props.history.push("/");
    } catch {
      setErr("Failed to sign in");
      setLoading(false);
    }
  };

  useEffect(() => inputRef.current.focus(), []);

  return (
    <main
      onSubmit={handleSubmit}
      onClickCapture={() => setShowModal(false)}
      className="main-auth"
    >
      {err && <h2>{err}</h2>}
      <form className="main-auth-form">
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
        <button disabled={loading}>Log In</button>
        <div className="main-auth-form-link">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
      <Footer showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
};

export default Login;
