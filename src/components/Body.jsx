import React, { useEffect } from "react";
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

  useEffect(() => {
    if (userData) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/profile/view`,
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
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
      }
    };

    fetchUser();
  }, [userData, dispatch, navigate, location.pathname]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;