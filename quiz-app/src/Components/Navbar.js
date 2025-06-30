import React from "react";
import UseStateContext from "../hooks/UseStateContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { resetContext } = UseStateContext();
  const navigate = useNavigate();
  const logout = () => {
    resetContext();
    navigate("/");
    alert("You have been logged out.");

  };
  return (
    <div>
      <nav className="navbar bg-body-tertiary d-flex align-items-center px-3" data-bs-theme="dark">
  <div className="flex-grow-1 text-center">
    <span className="navbar-brand mb-0 h1">Quiz App</span>
  </div>
  <div>
    <button
      type="button"
      className="btn btn-danger"
      style={{ marginTop: "-5px" }} 
      onClick={logout}
    >
      LogOut
    </button>
  </div>
</nav>
    </div>
  );
}
