import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [age, setAge] = useState(user?.age ?? '');
  const [gender, setGender] = useState(user?.gender || '');
  const [about, setAbout] = useState(user?.about || '');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Update form if Redux user data changes
  useEffect(() => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setPhotoUrl(user?.photoUrl || '');
    setAge(user?.age ?? '');
    setGender(user?.gender || '');
    setAbout(user?.about || '');
  }, [user]);

  const saveProfile = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const profileData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        photoUrl: photoUrl.trim(),
        age: age === '' ? undefined : Number(age),
        gender,
        about: about.trim(),
      };

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        profileData,
        { withCredentials: true }
      );

      // Supports either { data: { ...user } } or { ...user }
      const updatedUser = res.data?.data ?? res.data;

      if (!updatedUser || typeof updatedUser !== 'object') {
        throw new Error('Unexpected response from server');
      }

      dispatch(addUser(updatedUser));
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error(
        'Profile update failed:',
        err.response?.data || err
      );

      const message = err.response?.data?.message;

      setError(
        typeof message === 'string'
          ? message
          : typeof err.response?.data === 'string'
            ? err.response.data
            : err.message || 'Failed to update profile'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4">

      {/* Edit Profile Form */}
      <div className="card bg-base-300 w-full max-w-96 shadow-xl">
        <div className="card-body">

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-center">{success}</p>
          )}

          <h2 className="card-title justify-center">
            Edit Profile
          </h2>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            className="input input-bordered w-full"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            className="input input-bordered w-full"
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="url"
            placeholder="Photo URL"
            value={photoUrl}
            className="input input-bordered w-full"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            min="18"
            value={age}
            className="input input-bordered w-full"
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            placeholder="Gender"
            value={gender}
            className="input input-bordered w-full"
            onChange={(e) => setGender(e.target.value)}
          />

          <textarea
            placeholder="About"
            value={about}
            className="textarea textarea-bordered w-full"
            onChange={(e) => setAbout(e.target.value)}
          />

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={saveProfile}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Live Profile Preview */}
      <div className="w-full max-w-96">
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
      




    </div>

    
  );
};

export default EditProfile;
