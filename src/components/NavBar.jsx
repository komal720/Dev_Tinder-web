
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(removeUser());
      navigate("/login");
    }
  };

  return (
    <div className="navbar relative z-50 bg-base-300 shadow-sm">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          💻DevTinder
        </Link>
      </div>

      {/* User */}
      <div className="flex-none">
        {user && location.pathname !== "/login" && (
          <div className="dropdown dropdown-end dropdown-bottom mx-5 flex items-center">

            {/* Welcome */}
            <div className="form-control">
              Welcome, {user.firstName}
            </div>

            {/* Profile Image */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={
                    user.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[9999] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link to="/profile">
                  👤 Profile
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <Link to="/connections">
                  👤 Connections
                </Link>
              </li>

              <li>
                <Link to="/requests">
                  👤 Requests
                </Link>
              </li>

              <li>
  <button
    onClick={handleLogout}
    className="!text-sm !font-normal"
  >
    🚪 Logout
  </button>
</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
