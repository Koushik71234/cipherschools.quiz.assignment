import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Index.css'; // Import the CSS file

function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          navigate('/auth');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <ul>
          <li>
            <label htmlFor="email">Email Address:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </li>
          <li>
            <button type="submit" className="login-btn">Sign In</button>
          </li>
          <li className="forgot-signup">
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            <span> | </span>
            <a href="/signup" className="signup-link">Sign Up</a>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Index;
