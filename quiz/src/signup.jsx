import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent the default form submission
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/"); // Navigate to the index page after successful signup
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="signup-form">
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <ul>
            <li>
              <label htmlFor="name">Full Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                required
              />
            </li>
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
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </li>
            <li className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default Signup;
