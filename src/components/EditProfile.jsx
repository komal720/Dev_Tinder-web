
import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age ?? "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setPhotoUrl(user?.photoUrl || "");
    setAge(user?.age ?? "");
    setGender(user?.gender || "");
    setAbout(user?.about || "");
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName.trim() ) {
      setError("First name  are required.");
      return;
    }

    if (age !== "" && (Number(age) < 18 || Number(age) > 100)) {
      setError("Age must be between 18 and 100.");
      return;
    }

    setLoading(true);

    try {
      const profileData = {
        firstName: firstName.trim(),
       
        photoUrl: photoUrl.trim(),
        age: age === "" ? undefined : Number(age),
        gender,
        about: about.trim(),
      };

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        profileData,
        { withCredentials: true }
      );

      const updatedUser = res.data?.data ?? res.data;

      if (!updatedUser || typeof updatedUser !== "object") {
        throw new Error("Unexpected response from server");
      }

      dispatch(addUser(updatedUser));
      setSuccess("Your profile has been updated successfully!");
    } catch (err) {
      console.error(
        "Profile update failed:",
        err.response?.data || err
      );

      const message = err.response?.data?.message;

      setError(
        typeof message === "string"
          ? message
          : typeof err.response?.data === "string"
            ? err.response.data
            : err.message || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-300";

  const previewUser = {
    ...user,
    firstName,
    photoUrl,
    age,
    gender,
    about,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            <span>✨</span>
            Make it yours
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Edit Your <span className="text-violet-400">Profile</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Tell the community who you are. Update your details and make
            your developer profile stand out.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Edit form */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 text-xl shadow-lg shadow-violet-900/30">
                ⚙️
              </div>

              <div>
                <h2 className="text-xl font-bold">Personal information</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Keep your profile details up to date.
                </p>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300"
              >
                <span className="mr-2">✓</span>
                {success}
              </div>
            )}

            <form onSubmit={saveProfile} className="space-y-5">
              {/* Name fields */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    maxLength={50}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    maxLength={50}
                
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Profile photo URL */}
              <div>
                <label htmlFor="photoUrl" className={labelClass}>
                  Profile photo URL
                </label>

                <input
                  id="photoUrl"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-slate-500">
                  Paste a publicly accessible image URL.
                </p>
              </div>

              {/* Age and gender */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="age" className={labelClass}>
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="gender" className={labelClass}>
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" className="bg-slate-900">
                      Select gender
                    </option>
                    <option value="male" className="bg-slate-900">
                      Male
                    </option>
                    <option value="female" className="bg-slate-900">
                      Female
                    </option>
                    <option value="other" className="bg-slate-900">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* About */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="about" className={labelClass}>
                    About you
                  </label>
                  <span className="text-xs text-slate-500">
                    {about.length}/300
                  </span>
                </div>

                <textarea
                  id="about"
                  placeholder="Tell other developers about yourself, your skills, and your interests..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={5}
                  maxLength={300}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Save button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-900/30 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-pink-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving changes...
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    Save Profile
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Your updated information will appear on your profile.
              </p>
            </form>
          </section>

          {/* Live preview */}
          <aside className="lg:sticky lg:top-24">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                Live preview
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                How others see you
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your preview updates as you edit your information.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl sm:p-6">
              <UserCard user={previewUser} />
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <span className="text-xl">💡</span>
              <p className="text-sm leading-6 text-slate-400">
                <span className="font-semibold text-slate-200">
                  Pro tip:
                </span>{" "}
                Add a clear profile photo and a meaningful bio to help other
                developers get to know you.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
