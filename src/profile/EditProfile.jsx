import React, { useEffect, useMemo, useState } from 'react';
import {
  IconBrandLinkedin,
  IconCheck,
  IconDeviceFloppy,
  IconInfoCircle,
  IconListCheck,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper';
import { RingLoader } from '../loader/RingLoader';
import {
  fetchUserProfile,
  updateUserProfile,
} from '../services/profileService';
import { getCurrentUser, setCurrentUser } from '../services/sessionService';

const emptyProfile = {
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
};

const mapProfileToForm = (profile) => ({
  name: profile?.fullName || profile?.name || '',
  email: profile?.email || '',
  location: profile?.location || '',
  bio: profile?.bio || '',
  avatarUrl: profile?.avatarUrl || '',
  phone: profile?.phoneNumber || '',
  linkedin: profile?.linkedinUrl || '',
  skills: Array.isArray(profile?.skills) ? profile.skills.join(', ') : profile?.skills || '',
  designation: profile?.designation || '',
  verified: Boolean(profile?.verified),
});

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const currentUser = getCurrentUser();

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'ADMIN';
  }, [currentUser?.role]);

  useEffect(() => {
    let active = true;

    if (!currentUser?.id) {
      setLoading(false);
      setError('Please sign in before editing your profile.');
      return undefined;
    }

    fetchUserProfile(currentUser.id)
      .then((response) => {
        if (active) {
          setFormData(mapProfileToForm(response.data));
        }
      })
      .catch(() => {
        if (active) {
          setFormData(emptyProfile);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [currentUser?.id]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        ? formData.skills.split(',').map((skill) => skill.trim()).filter(Boolean)
        : [],
      avatarUrl: formData.avatarUrl,
      designation: formData.designation,
      ...(isAdmin ? { verified: formData.verified } : {}),
    };

    try {
      await updateUserProfile(currentUser.id, payload);
      setCurrentUser({ ...currentUser, ...payload });
      setSuccess(true);
      window.dispatchEvent(new Event('profileUpdated'));
      window.setTimeout(() => navigate('/profile'), 1000);
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message ||
        requestError?.response?.data ||
        'Failed to update profile. Please try again.';

      setError(typeof message === 'string' ? message : 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <RingLoader color="#4f46e5" size="48px" />
        </div>
      </PageWrapper>
    );
  }

  const fields = [
    { name: 'name', label: 'Full Name', icon: IconUser, type: 'text', required: true },
    { name: 'email', label: 'Email', icon: IconMail, type: 'email', required: true },
    { name: 'location', label: 'Location', icon: IconMapPin, type: 'text' },
    { name: 'phone', label: 'Phone Number', icon: IconPhone, type: 'tel' },
    {
      name: 'linkedin',
      label: 'LinkedIn URL',
      icon: IconBrandLinkedin,
      type: 'url',
    },
    {
      name: 'designation',
      label: 'Designation',
      icon: IconUser,
      type: 'text',
    },
    {
      name: 'avatarUrl',
      label: 'Avatar URL',
      icon: IconUser,
      type: 'url',
    },
    {
      name: 'skills',
      label: 'Skills',
      icon: IconListCheck,
      type: 'text',
      placeholder: 'React, Node.js, SQL',
    },
  ];

  return (
    <PageWrapper>
      <section className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Edit Profile
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Update profile fields with a single straightforward form.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-8 flex items-center gap-4">
            <img
              src={formData.avatarUrl || '/avatars/default.png'}
              alt="Profile preview"
              className="h-20 w-20 rounded-full border border-slate-200 object-cover dark:border-slate-700"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Use an image URL for the avatar field to keep this screen backend-friendly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const FieldIcon = field.icon;

              return (
                <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span>{field.label}</span>
                  <div className="relative mt-2">
                    <FieldIcon
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>
              );
            })}
          </div>

          <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>Bio</span>
            <div className="relative mt-2">
              <IconInfoCircle
                size={18}
                className="pointer-events-none absolute left-4 top-4 text-slate-400"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={5}
                className={`${inputClass} resize-y pl-11`}
              />
            </div>
          </label>

          {isAdmin && (
            <label className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600"
              />
              Verified
            </label>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <IconDeviceFloppy size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {success && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
            <span className="inline-flex items-center gap-2">
              <IconCheck size={16} />
              Profile updated successfully.
            </span>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            <span className="inline-flex items-center gap-2">
              <IconX size={16} />
              {error}
            </span>
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

export default EditProfile;
