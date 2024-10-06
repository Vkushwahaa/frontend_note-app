import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  let { registerUser } = useContext(AuthContext);

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const email = event.target.email.value;
    const firstName = event.target.first_name.value;
    const lastName = event.target.last_name.value;

    if (!username || !password || !email || !firstName || !lastName) {
      alert("Please fill in all fields.");
      return;
    }
    await registerUser(event);
  };
  const [passwordVisible,setPasswordVisibe] = useState(true)
  const togglePassword = () =>{
    setPasswordVisibe(!PasswordVisible)
  }

  return (
    <div className="register-container">
      <div className="brand-logo">
        <h1>Notes</h1>
        <h2>\PP</h2>
      </div>
      <div className="register-div">
        <form onSubmit={handleRegister}>
          <h2 className="register-header">Register</h2>
          <input type="text" name="username" placeholder="username" />
          <br />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="password"
            />
          <br />
          <input type="email" name="email" placeholder="Email" />
          <br />
          <input type="text" name="first_name" placeholder="First-name" />
          <br />
          <input type="text" name="last_name" placeholder="last-name" />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="login-link">
          Already a user? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
