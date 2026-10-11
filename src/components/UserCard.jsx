
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
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

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(
        "Error sending request:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-xl">
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

        <p>{about || "This is a default about of the user!"}</p>

        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
