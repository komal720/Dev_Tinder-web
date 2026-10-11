
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
        const res = await axios.get(
          BASE_URL + "/user/connections",
          { withCredentials: true }
        );

        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error("Error fetching connections:", err);
        setError("Unable to load connections.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center mt-10">{error}</h1>;
  }

  if (!connections || connections.length === 0) {
    return (
      <h1 className="text-center mt-10">
        No connections found
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h2 className="font-bold text-2xl mb-8">
        Connections
      </h2>

      <div className="flex flex-col items-center gap-6 w-full">
        {connections.map((connection) => {
          const {
            firstName,
            lastName,
            photoUrl,
            about,
          } = connection;

          return (
            <div
              key={connection._id}
              className="flex items-center gap-4 p-5 rounded-xl bg-base-300 w-full max-w-md shadow-md"
            >
              <img
                alt={`${firstName}'s profile`}
                className="w-24 h-24 rounded-lg object-cover shrink-0"
                src={
                  photoUrl ||
                  "https://placehold.co/200x200?text=Profile"
                }
              />

              <div className="min-w-0">
                <h3 className="font-semibold text-lg">
                  {firstName} {lastName}
                </h3>

                <p className="text-sm opacity-80 break-words">
                  {about || "This is default photo"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Connections;
