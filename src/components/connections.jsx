
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

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
      }
    };

    fetchConnections();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0b0d14] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            Your people, your network
          </p>

          <h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
            My Connections
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Stay connected with amazing people.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
        </div>

        {/* Count */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-300">
            All Connections
          </h2>

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
            {connections?.length || 0} connected
          </span>
        </div>

        {/* Connection Cards */}
        {connections && connections.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, about } =
                connection;

              return (
                <div
                  key={_id}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#141720] p-4 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-[#191c28] hover:shadow-xl hover:shadow-violet-950/20 sm:gap-5 sm:p-5"
                >
                  {/* Profile Image */}
                  <div className="shrink-0 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 p-[2px]">
                    <img
                      src={photoUrl || "https://placehold.co/120x120/25283a/ffffff?text=User"}
                      alt={`${firstName} ${lastName}`}
                      className="h-20 w-20 rounded-[14px] object-cover sm:h-24 sm:w-24"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/120x120/25283a/ffffff?text=User";
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-violet-300 sm:text-xl">
                      {firstName} {lastName}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-400">
                      {about || "Ready to connect and collaborate."}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Connected
                    </div>
                  </div>

                  <span className="text-xl text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-violet-400">
                    →
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-[#141720] px-5 py-14 text-center">
            <div className="mb-4 text-5xl">🤝</div>
            <h3 className="text-lg font-bold text-white">
              No connections yet
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Explore profiles and start building your network!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
