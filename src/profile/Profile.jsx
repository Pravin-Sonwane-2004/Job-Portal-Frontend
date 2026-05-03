import React, { useEffect, useState } from 'react';
import {
  IconBrandLinkedin,
  IconEdit,
  IconInfoCircle,
  IconListCheck,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShieldCheck,
  IconShieldX,
  IconUser,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper';
import { RingLoader } from '../loader/RingLoader';
import {
  fetchUserProfile,
  requestUserVerification,
} from '../services/profileService';
import { getCurrentUser } from '../services/sessionService';

const mapProfile = (profile) => {
  if (!profile) {
    return null;
  }

  return {
    name: profile.fullName || profile.name || profile.userName || '',
    email: profile.email || '',
    location: profile.location || '',
    bio: profile.bio || '',
    avatarUrl: profile.avatarUrl || '',
    phone: profile.phoneNumber || '',
    linkedin: profile.linkedinUrl || '',
    skills: Array.isArray(profile.skills) ? profile.skills : [],
    designation: profile.designation || '',
    verified: Boolean(profile.verified),
  };
};

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [verifySuccess, setVerifySuccess] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    let active = true;

    if (!currentUser?.id) {
      setLoading(false);
      return undefined;
    }

    fetchUserProfile(currentUser.id)
      .then((response) => {
        if (!active) {
          return;
        }

        setUserData(mapProfile(response.data));
      })
      .catch(() => {
        if (active) {
          setUserData(null);
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

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyError('');
    setVerifySuccess(false);

    try {
      await requestUserVerification();
      setVerifySuccess(true);
      setUserData((currentUser) =>
        currentUser ? { ...currentUser, verified: true } : currentUser
      );
    } catch {
      setVerifyError('Verification request failed. Try again later.');
    } finally {
      setVerifying(false);
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

  if (!userData) {
    return (
      <PageWrapper>
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-red-700 dark:text-red-300">
            Failed to load profile data.
          </p>
          <button
            type="button"
            onClick={() => navigate('/edit-profile')}
            className="mt-4 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Create or Edit Profile
          </button>
        </div>
      </PageWrapper>
    );
  }

  const details = [
    { label: 'Name', value: userData.name, icon: IconUser },
    { label: 'Email', value: userData.email, icon: IconMail },
    { label: 'Location', value: userData.location || 'N/A', icon: IconMapPin },
    { label: 'Phone', value: userData.phone || 'N/A', icon: IconPhone },
    {
      label: 'LinkedIn',
      value: userData.linkedin || 'N/A',
      icon: IconBrandLinkedin,
      isLink: Boolean(userData.linkedin),
    },
    {
      label: 'Skills',
      value: userData.skills.length ? userData.skills.join(', ') : 'N/A',
      icon: IconListCheck,
    },
  ];

  return (
    <PageWrapper>
      <section className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={userData.avatarUrl || '/avatars/default.png'}
                alt={`${userData.name}'s profile`}
                className="h-20 w-20 rounded-full border border-slate-200 object-cover dark:border-slate-700"
              />
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {userData.name || 'User'}
                </h1>
                {userData.designation && (
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {userData.designation}
                  </p>
                )}
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  {userData.verified ? (
                    <>
                      <IconShieldCheck size={14} />
                      Verified
                    </>
                  ) : (
                    <>
                      <IconShieldX size={14} />
                      Not Verified
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/edit-profile')}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                <IconEdit size={18} />
                Edit Profile
              </button>
              {!userData.verified && (
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifying}
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  {verifying ? 'Requesting...' : 'Get Verified'}
                </button>
              )}
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            About
          </h2>
          <div className="mt-4 flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70">
            <IconInfoCircle size={18} className="mt-0.5 text-indigo-600 dark:text-indigo-400" />
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {userData.bio || 'No bio added yet.'}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Details
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {details.map((detail) => {
              const DetailIcon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div className="flex items-start gap-3">
                    <DetailIcon
                      size={18}
                      className="mt-0.5 text-indigo-600 dark:text-indigo-400"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {detail.label}
                      </p>
                      {detail.isLink ? (
                        <a
                          href={detail.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block break-all text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {verifySuccess && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
            Verification request sent successfully.
          </div>
        )}

        {verifyError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            {verifyError}
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

export default Profile;
