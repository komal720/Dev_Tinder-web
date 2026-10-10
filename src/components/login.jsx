
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      // Save logged-in user in Redux
      dispatch(addUser(res.data));

      // Navigate after successful login
      navigate("/");

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err.response?.data || err.message
      );

      const errorMessage = err.response?.data;
      setError(
        typeof errorMessage === "string"
          ? errorMessage
          : errorMessage?.message || "Login failed. Check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            Login
          </h2>

          {error && (
            <p role="alert" className="text-red-500 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="emailId" className="label">
                <span className="label-text">Email ID</span>
              </label>

              <input
                id="emailId"
                type="email"
                value={emailId}
                className="input input-bordered w-full"
                onChange={(e) => setEmailId(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                id="password"
                type="password"
                value={password}
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="card-actions justify-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
