
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setError("");

        const res = await axios.get(
          BASE_URL + "/user/connections",
          { withCredentials: true }
        );

        dispatch(addConnections(res.data.data || []));
      } catch (err) {
        console.error("Error fetching connections:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load connections. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [dispatch]);

  const connectionList = Array.isArray(connections) ? connections : [];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 h-10 w-64 animate-pulse rounded-lg bg-slate-800" />
            <div className="mx-auto h-4 w-80 max-w-full animate-pulse rounded bg-slate-800" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-slate-800" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-28 rounded bg-slate-800" />
                    <div className="h-3 w-20 rounded bg-slate-800" />
                  </div>
                </div>
                <div className="mt-6 h-12 rounded-lg bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-white">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (connectionList.length === 0) {
    return (
      <div className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />

        <div className="relative max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-pink-500/20 text-5xl shadow-lg shadow-violet-950/30">
            🤝
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
            Your network starts here
          </p>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            No connections yet
          </h2>

          <p className="mx-auto mt-4 max-w-sm leading-7 text-slate-400">
            Great collaborations start with a connection. Explore developers
            and find people who share your interests.
          </p>

          <a
            href="/feed"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 font-bold text-white shadow-lg shadow-violet-900/30 transition hover:-translate-y-0.5 hover:shadow-violet-700/30"
          >
            Explore Developers <span>→</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-96 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
              <span>💜</span>
              Your developer network
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              My <span className="text-violet-400">Connections</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Meet your developer network, discover shared interests, and
              turn connections into collaborations.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-xl">
              👥
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">
                {connectionList.length}
              </p>
              <p className="text-xs font-medium text-slate-400">
                Total connections
              </p>
            </div>
          </div>
        </div>

        {/* Connection cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {connectionList.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              photoUrl,
              about,
            } = connection;

            const fullName =
              `${firstName || ""} ${lastName || ""}`.trim() ||
              "Developer";

            return (
              <article
                key={_id}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-950/20"
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-70 transition group-hover:opacity-100" />

                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={
                        photoUrl ||
                        "https://placehold.co/200x200/1e293b/ffffff?text=Dev"
                      }
                      alt={`${fullName}'s profile`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/200x200/1e293b/ffffff?text=Dev";
                      }}
                      className="h-20 w-20 rounded-2xl border border-slate-700 object-cover transition duration-300 group-hover:scale-105"
                    />

                    <span
                      className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-slate-900 bg-emerald-400"
                      title="Connected"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-bold text-white transition group-hover:text-violet-300">
                      {fullName}
                    </h2>

                    <p className="mt-1 text-sm text-emerald-400">
                      ✓ Connected
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      DevTinder member
                    </p>
                  </div>
                </div>

                <div className="my-5 h-px bg-slate-800" />

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    About
                  </p>

                  <p className="min-h-[4.5rem] break-words text-sm leading-6 text-slate-400">
                    {about || "This developer hasn't added a bio yet."}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💻</span>
                    <span className="text-xs font-medium text-slate-400">
                      Developer Network
                    </span>
                  </div>

                  <span className="text-lg text-violet-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Good things happen when developers connect.{" "}
            <span className="text-violet-400">Keep building 🚀</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Connections;
