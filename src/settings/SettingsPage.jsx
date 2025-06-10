import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Switch, Divider, Text } from '@mantine/core';

const SettingsPage = ({ isLoggedIn, userName, admin, user, jwt }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Optionally, load settings from API/localStorage here
  }, []);

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleDeleteAccount = () => {
    navigate('/delete-account');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <Divider mb={16} />
      <div className="mb-6">
        <Text size="sm" mb={4}><b>User:</b> {userName || 'User'}</Text>
        <Text size="sm" mb={8}><b>Role:</b> {admin ? 'Admin' : user ? 'User' : 'Guest'}</Text>
      </div>
      <div className="mb-6">
        <Switch
          label="Dark mode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.currentTarget.checked)}
          mb={8}
        />
      </div>
      <div className="mb-6">
        <Switch
          label="Email notifications"
          checked={emailNotif}
          onChange={(e) => setEmailNotif(e.currentTarget.checked)}
          mb={8}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="language-select" style={{ fontWeight: 500, marginRight: 8 }}>Language:</label>
        <select
          id="language-select"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: 4 }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      {isLoggedIn && (
        <>
          <Divider mb={16} />
          <div className="mb-6">
            <Switch
              label="Profile Public"
              checked={profilePublic}
              onChange={(e) => setProfilePublic(e.currentTarget.checked)}
              mb={8}
            />
          </div>
          <div className="mb-6">
            <Button
              variant="outline"
              color="blue"
              fullWidth
              mb={8}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </div>
          <div className="mb-6">
            <Button
              variant="outline"
              color="red"
              fullWidth
              mb={8}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPage;
