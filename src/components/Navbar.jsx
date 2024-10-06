import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home">
            <p>home</p>
          </Link>
        </li>

        <li>
          {!user ? (
            <Link to="/login">
              <p>login</p>
            </Link>
          ) : (
            <p onClick={logoutUser}>logout</p>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
