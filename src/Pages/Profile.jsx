import React, { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

const Profile = () => {
  const { user, setLoading } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    photoURL: '',
    bio: '',
    email: ''
  });
  const [userStats, setUserStats] = useState({
    totalArticles: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchUserData();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axiosSecure.get(`/user/${user.email}`);
      const userData = response.data;
      setFormData({
        userName: userData.userName || user.displayName || '',
        photoURL: userData.photoURL || user.photoURL || '',
        bio: userData.bio || '',
        email: user.email
      });
      setLoadingData(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setFormData({
        userName: user.displayName || '',
        photoURL: user.photoURL || '',
        bio: '',
        email: user.email
      });
      setLoadingData(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axiosSecure.get(`/analytics/${user.email}?email=${user.email}`);
      setUserStats({
        totalArticles: response.data.totalArticles,
        totalLikes: response.data.totalLikes,
        totalComments: response.data.totalComments
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update in Firebase
      await updateProfile(auth.currentUser, {
        displayName: formData.userName,
        photoURL: formData.photoURL
      });

      // Update in MongoDB
      await axiosSecure.put(`/user/${user.email}?email=${user.email}`, {
        userName: formData.userName,
        photoURL: formData.photoURL,
        bio: formData.bio
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully. Changes will reflect across the platform.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then(() => {
        setIsEditing(false);
        fetchUserData();
        fetchUserStats();
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.message
      });
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-base-100 rounded-lg shadow-xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {formData.photoURL ? (
                  <img src={formData.photoURL} alt="Profile" />
                ) : (
                  <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full rounded-full text-4xl">
                    {formData.userName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{formData.userName || 'User'}</h1>
              <p className="text-gray-500 mb-2">{formData.email}</p>
              {formData.bio && <p className="text-gray-600 italic">{formData.bio}</p>}
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="stat bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg">
            <div className="stat-figure text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div className="stat-title text-blue-100">Total Articles</div>
            <div className="stat-value">{userStats.totalArticles}</div>
          </div>

          <div className="stat bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg">
            <div className="stat-figure text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div className="stat-title text-green-100">Total Likes</div>
            <div className="stat-value">{userStats.totalLikes}</div>
          </div>

          <div className="stat bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg">
            <div className="stat-figure text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
            <div className="stat-title text-purple-100">Total Comments</div>
            <div className="stat-value">{userStats.totalComments}</div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-base-100 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Edit Profile Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Display Name</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email (Cannot be changed)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn btn-primary flex-1">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
