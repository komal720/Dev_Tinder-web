
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to load requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(
        addRequests(
          requests.filter((request) => request._id !== requestId)
        )
      );
    } catch (err) {
      console.error("Failed to review request:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-md text-primary" />
        <p className="text-sm text-base-content/60">
          Loading requests...
        </p>
      </div>
    );
  }

  // Empty State
  if (!requests || requests.length === 0) {
    return (
      <section className="min-h-[70vh] bg-base-200 flex items-center justify-center px-4">
        <div className="card bg-base-100 border border-base-300 shadow-lg rounded-2xl max-w-sm w-full">
          <div className="card-body items-center text-center p-7">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
              💌
            </div>

            <h2 className="text-xl font-bold mt-2">
              No Requests Yet
            </h2>

            <p className="text-sm text-base-content/60">
              When someone wants to connect with you, their request
              will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-base-200 px-4 py-7 sm:py-9">
      <div className="max-w-5xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-7">
          <span className="text-3xl">💌</span>

          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Connection{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Requests
            </span>
          </h1>

          <p className="text-sm text-base-content/60 mt-2">
            Discover developers who want to connect with you.
          </p>

          <div className="badge badge-primary badge-outline mt-3">
            {requests.length}{" "}
            {requests.length === 1 ? "Request" : "Requests"}
          </div>
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
          {requests.map((request) => {
            const {
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            } = request.fromUserId || {};

            return (
              <div
                key={request._id}
                className="card bg-base-100 border border-base-300/70 w-full max-w-xs rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-200"
              >
                {/* Profile Image */}
                <figure className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      photoUrl ||
                      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    alt={`${firstName || "User"}'s profile`}
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                </figure>

                {/* User Information */}
                <div className="card-body p-4 gap-2">
                  <h2 className="text-lg font-bold truncate">
                    {firstName} {lastName || ""}
                  </h2>

                  {age != null && gender && (
                    <p className="text-sm text-base-content/60">
                      {age}, {gender}
                    </p>
                  )}

                  <p className="text-sm text-base-content/75 line-clamp-3 break-words min-h-10">
                    {about || "No bio added yet."}
                  </p>

                  {/* Action Buttons */}
                  <div className="card-actions flex-nowrap justify-center gap-2 mt-3">
                    <button
                      className="btn btn-sm flex-1 rounded-lg"
                      onClick={() =>
                        reviewRequest("rejected", request._id)
                      }
                    >
                      Ignore
                    </button>

                    <button
                      className="btn btn-primary btn-sm flex-1 rounded-lg border-0 bg-gradient-to-r from-primary to-purple-600"
                      onClick={() =>
                        reviewRequest("accepted", request._id)
                      }
                    >
                      Interested
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Requests;
