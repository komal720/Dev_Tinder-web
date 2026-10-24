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

  const saveProfile = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const profileData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
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
      setSuccess("Profile updated successfully!");
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
          : err.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "input input-sm w-full bg-base-200 border-base-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-00";

  return (
    <section className="min-h-screen bg-base-200 px-4 py-6">
      <div className="max-w-5xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            Your Account
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Edit Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Profile
            </span>
          </h1>

          <p className="mt-1 text-sm text-base-content/60">
            Make your developer profile stand out.
          </p>
        </div>

        {/* Form and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

          {/* Edit Profile Form */}
          <div className="card bg-base-100 border border-base-300/70 shadow-lg rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

            <div className="card-body p-4 sm:p-5 gap-3">

              {/* Form Heading */}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
                  ✏️
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Personal Details
                  </h2>
                  <p className="text-xs text-base-content/50">
                    Update your information
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="alert alert-error rounded-xl text-sm py-2"
                >
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  role="status"
                  className="alert alert-success rounded-xl text-sm py-2"
                >
                  <span>✓ {success}</span>
                </div>
              )}

              {/* First Name */}
              <div className="form-control gap-1">
                <label className="label py-0">
                  <span className="label-text text-sm font-semibold">
                    First Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  className={inputClass}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="form-control gap-1">
                <label className="label py-0">
                  <span className="label-text text-sm font-semibold">
                    Last Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  className={inputClass}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Profile Photo URL */}
              <div className="form-control gap-1">
                <label className="label py-0">
                  <span className="label-text text-sm font-semibold">
                    Profile Photo URL
                  </span>
                </label>

                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrl}
                  className={inputClass}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <p className="text-xs text-base-content/50">
                  Add a link to your profile picture.
                </p>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div className="form-control gap-1">
                  <label className="label py-0">
                    <span className="label-text text-sm font-semibold">
                      Age
                    </span>
                  </label>

                  <input
                    type="number"
                    placeholder="Age"
                    min="18"
                    value={age}
                    className={inputClass}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="form-control gap-1">
                  <label className="label py-0">
                    <span className="label-text text-sm font-semibold">
                      Gender
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Gender"
                    value={gender}
                    className={inputClass}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>

              {/* About */}
              <div className="form-control gap-1">
                <label className="label py-0">
                  <span className="label-text text-sm font-semibold">
                    About You
                  </span>
                </label>

                <textarea
                  placeholder="Tell other developers about yourself..."
                  value={about}
                  className="textarea textarea-bordered textarea-sm w-full min-h-24 resize-y bg-base-200 border-base-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                  onChange={(e) => setAbout(e.target.value)}
                />

                <p className="text-xs text-base-content/50 text-right">
                  {about.length} characters
                </p>
              </div>

              {/* Save Button */}
              <button
                type="button"
                className="btn btn-primary btn-sm w-full mt-1 rounded-xl border-0 bg-gradient-to-r from-primary to-purple-600 text-white shadow-md hover:shadow-primary/30 transition-all duration-200"
                onClick={saveProfile}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save Changes <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex flex-col gap-3">

            {/* Preview Heading */}
            <div className="flex items-center gap-2 px-1">
              <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-base">
                👀
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Live Preview
                </h2>
                <p className="text-xs text-base-content/50">
                  See how your profile looks
                </p>
              </div>
            </div>

            {/* Compact Preview Container */}
            <div className="rounded-2xl p-2 sm:p-3 bg-base-100 border border-base-300/70 shadow-lg w-full max-w-sm mx-auto">
              <UserCard
                user={{
                  ...user,
                  firstName,
                  lastName,
                  photoUrl,
                  age,
                  gender,
                  about,
                }}
              />
            </div>

            {/* Pro Tip */}
            <div className="flex items-start gap-2 rounded-xl border border-primary/15 bg-primary/5 p-3">
              <span className="text-base">💡</span>

              <p className="text-xs leading-relaxed text-base-content/70">
                <span className="font-semibold text-base-content">
                  Pro tip:
                </span>{" "}
                Add a clear photo and a meaningful bio to help other
                developers get to know you.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EditProfile;
