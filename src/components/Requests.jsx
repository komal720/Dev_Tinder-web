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

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (!requests || requests.length === 0) {
    return (
      <h1 className="text-center mt-10">
        No requests found
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 my-10">
      {requests.map((request) => {
        const {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="card bg-base-300 w-80 shadow-sm"
          >
            <figure>
              <img
                className="w-full h-64 object-cover"
                src={
                  photoUrl ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="Profile"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {firstName} {lastName || ""}
              </h2>

              {age && gender && (
                <p>{age}, {gender}</p>
              )}

              <p>{about}</p>

              <div className="card-actions justify-center my-4">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    reviewRequest("rejected", request._id)
                  }
                >
                  Ignore
                </button>

                <button
                  className="btn btn-secondary"
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
  );
};

export default Requests;
