// filepath: c:\SPRING BOOT\Fullstack JobApp Primary\job-portal-frontend\src\settings\Settings.jsx
import React, { useState } from 'react';
import { Card, Title, Text, Divider, Switch, Button, Space } from '@mantine/core';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  // You can fetch user info here if needed
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <div className="flex justify-center items-start mt-10">
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: 350 }}>
        <Title order={3} mb={10}>Settings</Title>
        <Divider mb={10} />
        <Text size="sm" mb={8}><b>User:</b> {userName}</Text>
        <Switch
          label="Dark mode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.currentTarget.checked)}
          mb={8}
        />
        <Switch
          label="Email notifications"
          checked={emailNotif}
          onChange={(e) => setEmailNotif(e.currentTarget.checked)}
          mb={8}
        />
        <Divider my={12} />
        <Text size="sm" color="dimmed" mb={8}>
          Account actions and more settings coming soon.
        </Text>
        <Button variant="outline" color="red" fullWidth disabled>
          Delete Account
        </Button>
      </Card>
    </div>
  );
};

export default Settings;
