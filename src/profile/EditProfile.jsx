import React, { useEffect, useState } from 'react';
import {
  IconCheck,
  IconX,
  IconDeviceFloppy,
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
import { GET_PROFILE, UPDATE_PROFILE } from '../all services/getJfBackendService';
import { RingLoader } from '../loader/RingLoader';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
    avatarUrl: '',
    phone: '',
    linkedin: '',
    skills: '',
    designation: '',
    verified: false,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(GET_PROFILE, { withCredentials: true });
        setFormData({
          name: res.data.fullName || '',
          email: res.data.email || '',
          location: res.data.location || '',
          bio: res.data.bio || '',
          avatarUrl: res.data.avatarUrl || '',
          phone: res.data.phoneNumber || '',
          linkedin: res.data.linkedinUrl || '',
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : res.data.skills || '',
          designation: res.data.designation || '',
          verified: res.data.verified || false,
        });
      } catch (err) {
        setFormData({
          name: '',
          email: '',
          location: '',
          bio: '',
          avatarUrl: '',
          phone: '',
          linkedin: '',
          skills: '',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setFormData({ ...formData, avatarUrl: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    const payload = {
      name: formData.name,
      email: formData.email,
      location: formData.location,
      bio: formData.bio,
      phoneNumber: formData.phone,
      linkedinUrl: formData.linkedin,
      skills: formData.skills
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      avatarUrl: formData.avatarUrl,
      designation: formData.designation,
    };

    const userRole = sessionStorage.getItem('role') || localStorage.getItem('role');
    if (userRole === 'ADMIN') {
      payload.verified = formData.verified;
    }

    try {
      const token = sessionStorage.getItem('jwt');
      await axios.put(UPDATE_PROFILE, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSuccess(true);
      window.dispatchEvent(new Event('profileUpdated'));
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      if (err.response) {
        console.error('Backend error:', err.response.data);
        setError(`Failed to update profile: ${err.response.data}`);
      } else {
        console.error(err);
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-6 md:px-4 md:py-8">
        <RingLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 bg-slate-50 dark:bg-slate-900 px-4 py-6 md:px-4 md:py-8 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-4">
          Edit Profile
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
          Update your profile information
        </p>

        <div className="flex justify-start mb-6">
          <img
            src={formData.avatarUrl || '/avatars/default.png'}
            alt="Profile avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-400 shadow-lg"
          />
        </div>

        <div className="mb-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="cursor-pointer file:mr-2 file:px-3 file:py-1 file:rounded-md file:border-none file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconUser size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconMail size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconMapPin size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <IconInfoCircle size={18} className="text-slate-400" />
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconPhone size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 234 567 8901"
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">LinkedIn</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconBrandLinkedin size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="LinkedIn profile URL"
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Skills</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconListCheck size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="Comma separated (e.g. React, Node.js, SQL)"
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="e.g. Software Engineer"
              className="w-full px-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={e => setFormData({ ...formData, verified: e.target.checked })}
                className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 rounded"
              />
              Verified
            </label>
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <IconDeviceFloppy size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              <IconCheck size={18} className="text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-800 dark:text-green-400">Success</span>
            </div>
            <p className="text-green-700 dark:text-green-300 mt-1">Profile updated successfully!</p>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2">
              <IconX size={18} className="text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-800 dark:text-red-400">Error</span>
            </div>
            <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;