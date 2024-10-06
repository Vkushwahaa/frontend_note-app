import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    await loginUser(event)
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="brand-logo">
        <h1>Notes</h1>
        <h2>\PP</h2>
      </div>
      <div className="login-div">
        <form onSubmit={handleLogin}>
          <h2 className="login-header">login</h2>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={loginUser.username}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={loginUser.password}
          />
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-link">
          not a user? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
