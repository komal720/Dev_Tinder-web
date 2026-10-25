
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
        const res = await axios.post(
          `${BASE_URL}/login`,
          { emailId, password },
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
        navigate("/");
      } else {
        await axios.post(
          `${BASE_URL}/signup`,
          { firstName, lastName, emailId, password },
          { withCredentials: true }
        );

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

  const switchForm = () => {
    setIsLoginForm((prev) => !prev);
    setError("");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070816] px-4 py-10 text-white sm:px-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/40 backdrop-blur-2xl md:grid-cols-2">
        {/* Left showcase panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-800 to-[#111127] p-10 md:flex lg:p-12">
          <div className="absolute -right-16 top-20 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -right-5 top-32 h-36 w-36 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black shadow-lg">
                D
              </div>
              <span className="text-xl font-bold tracking-tight">
                DevTinder<span className="text-fuchsia-300">.</span>
              </span>
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-violet-200">
              Code. Connect. Collaborate.
            </p>

            <h1 className="max-w-sm text-4xl font-black leading-tight lg:text-5xl">
              Your next
              <span className="block text-fuchsia-300">
                great connection
              </span>
              starts here.
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-indigo-100/80">
              Meet developers, discover new perspectives, and build
              something amazing together.
            </p>
          </div>

          <div className="relative mt-12 rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-400/20 text-lg">
                {"</>"}
              </div>
              <div>
                <p className="text-sm font-semibold">Made for developers</p>
                <p className="text-xs text-indigo-200">
                  Find your coding community
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Frontend", "Backend", "MERN", "Open Source"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-indigo-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Login / signup panel */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-9 flex items-center justify-center gap-3 md:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-black shadow-lg shadow-violet-900/40">
                D
              </div>
              <span className="text-xl font-bold">
                DevTinder<span className="text-fuchsia-400">.</span>
              </span>
            </div>

            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                {isLoginForm ? "WELCOME BACK" : "JOIN THE COMMUNITY"}
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {isLoginForm ? "Hey, welcome back!" : "Create your account."}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {isLoginForm
                  ? "Sign in to reconnect with your developer community."
                  : "Your next collaboration could start with one click."}
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300"
              >
                <span aria-hidden="true">!</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLoginForm && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Komal"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Pandey"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="emailId"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>
                <input
                  id="emailId"
                  type="email"
                  placeholder="you@example.com"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                  <span className="text-xs text-slate-500">
                    {isLoginForm ? "Good to see you again" : "Keep it secure"}
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={
                    isLoginForm ? "current-password" : "new-password"
                  }
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/40 transition duration-200 hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Please wait...
                  </>
                ) : (
                  <>
                    {isLoginForm ? "Sign in to your account" : "Create account"}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-xs text-slate-500">OR</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <p className="text-center text-sm text-slate-400">
              {isLoginForm
                ? "New to DevTinder?"
                : "Already part of the community?"}
              <button
                type="button"
                onClick={switchForm}
                disabled={loading}
                className="ml-1.5 font-semibold text-violet-400 transition hover:text-fuchsia-300 disabled:opacity-50"
              >
                {isLoginForm ? "Create an account" : "Sign in"}
              </button>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-600">
              By continuing, you agree to use DevTinder respectfully and
              responsibly.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
