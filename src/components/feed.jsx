
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [sentRequests, setSentRequests] = useState([]);
  const [requestsLoaded, setRequestsLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setError("");

        const [feedRes, requestsRes] = await Promise.all([
          axios.get(`${BASE_URL}/feed`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/user/requests/sent`, {
            withCredentials: true,
          }),
        ]);

        if (!isMounted) return;

        const feedUsers = feedRes.data?.data || [];
        const sentData = requestsRes.data?.data || [];

        dispatch(addFeed(feedUsers));

        const ids = sentData.map((request) =>
          String(request.toUserId?._id ?? request.toUserId)
        );

        setSentRequests(ids);
      } catch (err) {
        console.error(
          "Error loading feed or sent requests:",
          err.response?.data || err.message
        );

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load developers. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setRequestsLoaded(true);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const handleRequestSent = (userId) => {
    const id = String(userId);

    setSentRequests((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const handleRetry = () => {
    setRequestsLoaded(false);
    setError("");
    window.location.reload();
  };

  // Loading state
  if (feed === null || !requestsLoaded) {
    return (
      <div className="min-h-[80vh] bg-slate-950 px-4 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 h-4 w-36 animate-pulse rounded bg-slate-800" />
            <div className="mx-auto h-10 w-72 max-w-full animate-pulse rounded-lg bg-slate-800" />
            <div className="mx-auto mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-slate-800" />
          </div>

          <div className="mx-auto max-w-md animate-pulse rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="h-72 rounded-2xl bg-slate-800" />
            <div className="mt-6 h-6 w-2/3 rounded bg-slate-800" />
            <div className="mt-3 h-4 w-full rounded bg-slate-800" />
            <div className="mt-2 h-4 w-4/5 rounded bg-slate-800" />
            <div className="mt-6 h-12 rounded-xl bg-slate-800" />
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Finding developers for you...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-white">
            Couldn't load your feed
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            onClick={handleRetry}
            className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 font-bold text-white transition hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const availableUsers = (Array.isArray(feed) ? feed : []).filter(
    (user) => !sentRequests.includes(String(user._id))
  );

  // Empty state
  if (availableUsers.length === 0) {
    return (
      <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />

        <div className="relative max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-400/20 bg-violet-500/10 text-5xl">
            🎉
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
            You're all caught up
          </p>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            No new developers
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-400 sm:text-base">
            You've viewed everyone currently available in your feed.
            Check back later for more developers to discover.
          </p>

          <button
            onClick={handleRetry}
            className="mt-8 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-violet-500 hover:bg-slate-800"
          >
            Refresh Feed ↻
          </button>
        </div>
      </div>
    );
  }

  const currentUser = availableUsers[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-96 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            <span>✨</span>
            Discover your next connection
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Meet Your <span className="text-violet-400">Dev Match</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Discover developers, explore their interests, and build your
            professional network one connection at a time.
          </p>
        </div>

        {/* Feed information */}
        <div className="mx-auto mb-7 flex max-w-md items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Developers to discover
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Profiles available in your feed
            </p>
          </div>

          <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-violet-500/15 px-3 text-lg font-extrabold text-violet-300">
            {availableUsers.length}
          </div>
        </div>

        {/* Current developer card */}
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl shadow-black/20 sm:p-5">
            <UserCard
              key={currentUser._id}
              user={currentUser}
              requestSent={sentRequests.includes(String(currentUser._id))}
              onRequestSent={handleRequestSent}
            />
          </div>
        </div>

        <p className="mt-7 text-center text-xs text-slate-500">
          Every great collaboration starts with a connection. 💜
        </p>
      </div>
    </div>
  );
};

export default Feed;
