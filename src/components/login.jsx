import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("komal@gmail.com");
  const [password, setPassword] = useState("komQAZ!@3al#@123");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login successful:", res.data);

      dispatch(addUser(res.data));

      navigate("/");
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">

          <h2 className="card-title justify-center">
            Login
          </h2>

          <div>
            <label className="label">
              <span className="label-text">Email ID:</span>
            </label>

            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              type="password"
              value={password}
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;