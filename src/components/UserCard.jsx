
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const UserCard = ({
  user,
  requestSent = false,
  onRequestSent,
}) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
  } = user;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendRequest = async (status, userId) => {
    if (loading || (status === "interested" && requestSent)) return;

    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (status === "interested") {
        onRequestSent?.(String(userId));
      }

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      const message =
        err.response?.data?.message || err.message;

      if (
        status === "interested" &&
        message === "Connection request already exists"
      ) {
        onRequestSent?.(String(userId));
        setError("A request already exists for this user.");
      } else {
        setError(message || "Could not send request. Please try again.");
      }

      console.error(
        "Error sending request:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <article className="group w-full overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900 text-white shadow-xl shadow-black/20 transition duration-300 hover:border-violet-500/50 hover:shadow-violet-950/30">
      {/* Profile image */}
      <div className="relative h-72 overflow-hidden sm:h-80">
        <img
          src={photoUrl || DEFAULT_AVATAR}
          alt={`${firstName || "User"}'s profile`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_AVATAR;
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
          Discover people
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {fullName || "New Member"}
            {age ? (
              <span className="ml-2 font-medium text-slate-300">
                {age}
              </span>
            ) : null}
          </h2>

          {gender && (
            <p className="mt-1 text-sm capitalize text-slate-300">
              {gender}
            </p>
          )}
        </div>
      </div>

      {/* Profile details */}
      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            About me
          </p>

          <p className="break-words text-sm leading-6 text-slate-300">
            {about?.trim() ||
              "This member hasn't added a bio yet. Send a request to connect!"}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-300"
          >
            {error}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-5">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSendRequest("ignore", _id)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span aria-hidden="true">✕</span>
            Ignore
          </button>

          <button
            type="button"
            disabled={loading || requestSent}
            onClick={() => handleSendRequest("interested", _id)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Please wait
              </>
            ) : requestSent ? (
              "Request Sent ✓"
            ) : (
              <>
                Interested
                <span aria-hidden="true">♥</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
