
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed !== null) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      console.log("Feed response:", res.data);
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(
        "Error fetching feed:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed === null) {
    return <h1 className="text-center my-10">Loading...</h1>;
  }

  if (feed.length === 0) {
    return <h1 className="text-center my-10">No new users</h1>;
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
