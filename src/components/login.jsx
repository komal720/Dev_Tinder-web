
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      if (isLoginForm) {
        // Login
        const res = await axios.post(
          BASE_URL + "/login",
          { emailId, password },
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
        navigate("/");
      } else {
        // Signup
        await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true }
        );

        // Switch to login after successful signup
        setIsLoginForm(true);
        setPassword("");
        setError("");
      }
    } catch (err) {
      console.error(
        "AUTH ERROR:",
        err.response?.data || err.message
      );

      const errorMessage = err.response?.data;

      setError(
        typeof errorMessage === "string"
          ? errorMessage
          : errorMessage?.message ||
              (isLoginForm
                ? "Login failed. Check your email and password."
                : "Signup failed. Please try again.")
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
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {error && (
            <p role="alert" className="text-red-500 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
              <>
                <div className="mb-3">
                  <label htmlFor="firstName" className="label">
                    <span className="label-text">First Name</span>
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="label">
                    <span className="label-text">Last Name</span>
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </>
            )}

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
                autoComplete={
                  isLoginForm ? "current-password" : "new-password"
                }
                required
              />
            </div>

            <div className="card-actions justify-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : isLoginForm
                  ? "Login"
                  : "Sign Up"}
              </button>
            </div>
          </form>

<div className="flex justify-center items-center gap-1 mt-4">
  <span>
    {isLoginForm ? "New User?" : "Existing User?"}
  </span>

  <button
    type="button"
    className="btn btn-ghost btn-sm normal-case font-normal no-underline hover:bg-transparent"
    onClick={() => {
      setIsLoginForm(!isLoginForm);
      setError("");
    }}
  >
    {isLoginForm ? "Sign Up" : "Login"}
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;