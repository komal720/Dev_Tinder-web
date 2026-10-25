
import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user || !user._id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />
          <p className="text-sm text-slate-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:py-14">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Profile header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            Your personal space
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My <span className="text-violet-400">Profile</span>
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            Make your profile stand out. Update your details and let others
            know more about you.
          </p>
        </div>

        {/* Edit profile section */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-8">
          <EditProfile user={user} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Keep your profile updated to make meaningful connections.
        </p>
      </div>
    </main>
  );
};

export default Profile;
