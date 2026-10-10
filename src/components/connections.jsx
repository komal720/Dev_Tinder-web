
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

        console.log("Connections data:", res.data.data);

        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error(
          "Error fetching connections:",
          err.response?.data || err.message
        );

        setError("Unable to load connections. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;

  if (!connections || connections.length === 0) {
    return <h1>No connections found</h1>;
  }

  return (
    <div className="flex flex-col items-center my-10">
      <h2 className="font-bold text-2xl mb-6">
        Connections
      </h2>

      {connections.map((connection) => {
        const {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = connection;

        return (
          <div
            key={connection._id}
            className="m-4 p-4 rounded-lg bg-base-300"
          >
            <img
              alt="photo"
              className="w-20 h-20"
              src={photoUrl}
            />

            <h2>{firstName + " " + lastName}</h2>

            <p>{about}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
