import React from "react";

import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {

  const location = useLocation();
  return (
    <div className="header">
      <h1>Notes App</h1>
      <Navbar />
    </div>
  );
};

export default Header;
