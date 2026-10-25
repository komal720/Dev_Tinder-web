import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store) => store.user);
  const [checkingAuth, setCheckingAuth] = useState(!userData);

  useEffect(() => {
    // If the user is already available in Redux, no API call is needed.
    if (userData) {
      setCheckingAuth(false);
      return;
    }

    let isMounted = true;

    const fetchUser = async () => {
      try {
        setCheckingAuth(true);

        const res = await axios.get(
          `${BASE_URL}/profile/view`,
          { withCredentials: true }
        );

        if (isMounted) {
          dispatch(addUser(res.data));
        }
      } catch (err) {
        if (err.response?.status === 401) {
          if (location.pathname !== "/login") {
            navigate("/login", { replace: true });
          }
        } else {
          console.error(
            "Fetch user error:",
            err.response?.data || err.message
          );
        }
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userData, dispatch, navigate, location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Navigation */}
      <NavBar />

      {/* Main page content */}
      <main className="relative flex-1">
        {checkingAuth && location.pathname !== "/login" ? (
          <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/20 bg-violet-500/10">
                <span className="text-3xl">💜</span>

                <span className="absolute inset-0 animate-ping rounded-3xl border border-violet-400/30" />
              </div>

              <h2 className="text-xl font-bold tracking-tight text-white">
                Welcome to DevTinder
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Getting everything ready for you...
              </p>

              <div className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
              </div>
            </div>
          </div>
        ) : (
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        )}
      </main>

      {/* Footer stays at the bottom on short pages */}
      <Footer />
    </div>
  );
};

export default Body;
