import React, { useEffect, useState } from 'react';
import {
  IconEdit,
  IconShieldCheck,
  IconShieldX,
  IconUser,
  IconMail,
  IconMapPin,
  IconInfoCircle,
  IconPhone,
  IconBrandLinkedin,
  IconListCheck,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GET_PROFILE } from '../all services/getJfBackendService';
import { RingLoader } from '../loader/RingLoader';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [verifySuccess, setVerifySuccess] = useState(false);

  useEffect(() => { 
    const fetchUserData = async () => {
      try {
        // Try both possible endpoints for user profile
        let res;
          res = await axios.get(GET_PROFILE, { withCredentials: true });
        // Defensive: check if res.data exists and has expected fields
        if (!res.data || (!res.data.fullName && !res.data.userName && !res.data.email)) {
          setUserData(null);
        } else {
          setUserData({
            name: res.data.fullName || res.data.name || res.data.userName || '',
            email: res.data.email || '',
            location: res.data.location || '',
            bio: res.data.bio || '',
            avatarUrl: res.data.avatarUrl || '',
            phone: res.data.phoneNumber || '',
            linkedin: res.data.linkedinUrl || '',
            skills: Array.isArray(res.data.skills) ? res.data.skills : [],
            designation: res.data.designation || '',
            verified: res.data.verified || false,
          });
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyError('');
    setVerifySuccess(false);
    try {
      // If you have a verification endpoint, update it here as well
      await axios.post('http://127.0.0.1:8080/api/user/verify', {}, { withCredentials: true });
      setVerifySuccess(true);
      setUserData({ ...userData, verified: true });
    } catch (err) {
      setVerifyError('Verification request failed. Try again later.');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-6 md:px-4 md:py-8">
        <RingLoader />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-6 md:px-4 md:py-8">
        <div className="flex flex-col items-center">
          <div className="text-red-600 dark:text-red-400 text-center mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            Failed to load profile data.
          </div>
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create/Edit Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-slate-50 dark:bg-slate-900 px-4 py-6 md:px-4 md:py-8 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col items-center relative mb-6">
          <img
            src={userData.avatarUrl || '/avatars/default.png'}
            alt={`${userData.name}'s profile picture`}
            className="w-24 h-24 rounded-full border-4 border-indigo-400 shadow-xl transition-transform hover:scale-105 mb-4"
          />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {userData.name}
          </h1>
        </div>

        
        

        <div className="flex justify-center mb-6">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            userData.verified
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300'
          }`}>
            {userData.verified ? <IconShieldCheck size={14} /> : <IconShieldX size={14} />}
            {userData.verified ? 'Verified' : 'Not Verified'}
          </span>
        </div>

        <hr className="border-slate-200 dark:border-slate-600 my-6" />

        {/* Profile fields with icons */}
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <IconUser size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-600 dark:text-slate-400">Name:</span>
              <span className="ml-2 text-slate-900 dark:text-slate-100">{userData.name}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconMail size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-600 dark:text-slate-400">Email:</span>
              <span className="ml-2 text-slate-900 dark:text-slate-100">{userData.email}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconMapPin size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-600 dark:text-slate-400">Location:</span>
              <span className="ml-2 text-slate-900 dark:text-slate-100">{userData.location || 'N/A'}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconInfoCircle size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-600 dark:text-slate-400">Bio:</span>
              <span className="ml-2 text-slate-900 dark:text-slate-100">{userData.bio || 'No bio added yet.'}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconPhone size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-600 dark:text-slate-400">Phone:</span>
              <span className="ml-2 text-slate-900 dark:text-slate-100">{userData.phone || 'N/A'}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconBrandLinkedin size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-600 dark:text-slate-400">LinkedIn:</span>
              {userData.linkedin ? (
                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline"
                >
                  {userData.linkedin}
                </a>
              ) : (
                <span className="ml-2 text-slate-900 dark:text-slate-100">N/A</span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <IconListCheck size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-600 dark:text-slate-400">Skills:</span>
              <span className="ml-2 text-slate-900 dark:text-slate-100">
                {userData.skills && userData.skills.length
                  ? Array.isArray(userData.skills)
                    ? userData.skills.join(', ')
                    : userData.skills
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate('/edit-profile')}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit your profile"
          >
            <IconEdit size={18} />
            Edit Profile
          </button>
          {!userData.verified && (
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 font-semibold py-2 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Request verification for your profile"
            >
              <IconShieldCheck size={18} />
              {verifying ? 'Requesting...' : 'Get Verified'}
            </button>
          )}
        </div>

        {verifySuccess && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              <IconShieldCheck size={18} className="text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-800 dark:text-green-400">Verification Requested</span>
            </div>
            <p className="text-green-700 dark:text-green-300 mt-1">Verification request sent! You are now verified.</p>
          </div>
        )}
        {verifyError && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2">
              <IconShieldX size={18} className="text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-800 dark:text-red-400">Verification Error</span>
            </div>
            <p className="text-red-700 dark:text-red-300 mt-1">{verifyError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
