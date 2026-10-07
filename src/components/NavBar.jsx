import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  console.log(user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          💻DevTinder
        </a>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          ></div>

          <div
            tabIndex={0}
            className="card card-sm dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          ></div>
        </div>

        {user && (
          <div className="dropdown dropdown-end mx-5 flex items-center">
            <div className="form-control">
              Welcome, {user.firstName}
            </div>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;