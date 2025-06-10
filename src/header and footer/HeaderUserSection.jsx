import React, { useState, useEffect } from 'react';
import { Avatar, Indicator, Button, Popover, Loader, Text, ScrollArea, Group, Switch, Badge, Divider, ActionIcon, Tooltip, Stack } from '@mantine/core';
import { IconBell, IconSettings, IconBookmark, IconUpload, IconCalendarEvent, IconMessage } from '@tabler/icons-react';
import axios from 'axios';

const HeaderUserSection = ({
  userName,
  admin,
  user,
  jwt,
  navigate,
  setJwt,
}) => {
  // Keep isLoggedIn in sync with sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwt'));
  useEffect(() => {
    const checkJwt = () => setIsLoggedIn(!!sessionStorage.getItem('jwt'));
    window.addEventListener('storage', checkJwt);
    const interval = setInterval(checkJwt, 500);
    return () => {
      window.removeEventListener('storage', checkJwt);
      clearInterval(interval);
    };
  }, []);
  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState('');
  const [notifUnread, setNotifUnread] = useState(false);

  // Settings popover state
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  // Notification popover state
  const [opened, setOpened] = useState(false);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch notifications when popover opens
  useEffect(() => {
    if (!opened || !jwt) return;
    setNotifLoading(true);
    setNotifError('');
    axios
      .get('/api/notifications', {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      })
      .then((res) => {
        setNotifications(res.data || []);
        setNotifUnread((res.data || []).some((n) => !n.read));
      })
      .catch(() => {
        setNotifError('Failed to load notifications');
        setNotifications([]);
        setNotifUnread(false);
      })
      .finally(() => setNotifLoading(false));
  }, [opened, jwt]);

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await axios.post(
        '/api/notifications/mark-all-read',
        {},
        { headers: { Authorization: `Bearer ${jwt}` }, withCredentials: true }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setNotifUnread(false);
    } catch { }
  };

  // Mark individual notification as read
  const markAsRead = async (id) => {
    try {
      await axios.post(
        `/api/notifications/${id}/mark-read`,
        {},
        { headers: { Authorization: `Bearer ${jwt}` }, withCredentials: true }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setNotifUnread(notifications.some((n) => n.id !== id && !n.read));
    } catch { }
  };

  // Clear all notifications
  const clearAll = async () => {
    try {
      await axios.delete('/api/notifications/clear-all', {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      });
      setNotifications([]);
      setNotifUnread(false);
    } catch { }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    setJwt && setJwt(null);
    navigate('/signin');
  };

  return (
    <div className="flex items-center gap-5">
      {!isLoggedIn ? (
        <Button
          variant="outline"
          color="bright-sun"
          onClick={() => {
            navigate('/SignIn');
          }}
        >
          Log In
        </Button>
      ) : (
        <button
          className="flex items-center gap-3 focus:outline-none hover:bg-masala-900 rounded-lg px-2 py-1 transition"
          onClick={() => navigate('/profile')}
          style={{ border: 'none', background: 'none' }}
        >
          <Avatar
            radius="xl"
            alt="Profile picture"
            src={user && user.profilePhoto ? user.profilePhoto : "/avatars/default.png"}
            className="cursor-pointer"
          />
          <span className="font-medium">
            {userName || (user && user.email) || 'User'}
          </span>
        </button>
      )}

      {/* Message Icon */}
      {isLoggedIn && (
        <Tooltip label="Messages" withArrow>
          <ActionIcon
            variant="filled"
            color="bright-sun"
            size="lg"
            onClick={() => navigate('/messages')}
          >
            <IconMessage size={22} />
          </ActionIcon>
        </Tooltip>
      )}
      {/* Settings Popover */}
      <Popover
        opened={settingsOpened}
        onChange={setSettingsOpened}
        width={280}
        position="bottom-end"
        offset={8}
        shadow="md"
        transitionProps={{ transition: 'scale-y', duration: 150 }}
      >
        <Popover.Target>
          <button
            className="bg-masala-900 p-2 rounded-full hover:bg-masala-800 transition"
            onClick={() => setSettingsOpened((o) => !o)}
          >
            <IconSettings stroke={1.5} />
          </button>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack spacing={12} style={{ minWidth: 240, maxWidth: 320 }}>
            <Text fw={700} size="lg" align="center">Settings</Text>
            <Divider />
            <Group spacing={8} align="center">
              <Avatar
                radius="xl"
                size={48}
                src={user && user.profilePhoto ? user.profilePhoto : "/avatars/default.png"}
                alt="Profile picture"
              />
              <div>
                <Text size="md" fw={600}>{userName || (user && user.email) || 'User'}</Text>
                <Text size="xs" color="dimmed">{admin ? 'Admin' : user ? 'User' : 'Guest'}</Text>
              </div>
            </Group>
            <Divider />
            <Switch
              label="Dark mode"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.currentTarget.checked)}
              size="md"
              color="bright-sun"
            />
            <Switch
              label="Email notifications"
              checked={emailNotif}
              onChange={(e) => setEmailNotif(e.currentTarget.checked)}
              size="md"
              color="bright-sun"
            />
            <Divider />
            {isLoggedIn && (
              <>
                <Group spacing={12} position="center" wrap="wrap">
                  <Tooltip label="Saved Jobs" withArrow>
                    <ActionIcon size={40} color="bright-sun" variant="filled" onClick={() => { setSettingsOpened(false); navigate('/saved-jobs'); }}>
                      <IconBookmark size={22} color="#f99b07" />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Job Alerts" withArrow>
                    <ActionIcon size={40} color="bright-sun" variant="filled" onClick={() => { setSettingsOpened(false); navigate('/job-alerts'); }}>
                      <IconBell size={22} color="#f99b07" />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Resume Upload" withArrow>
                    <ActionIcon size={40} color="bright-sun" variant="filled" onClick={() => { setSettingsOpened(false); navigate('/resume-upload'); }}>
                      <IconUpload size={22} color="#f99b07" />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Interviews" withArrow>
                    <ActionIcon size={40} color="bright-sun" variant="filled" onClick={() => { setSettingsOpened(false); navigate('/interviews'); }}>
                      <IconCalendarEvent size={22} color="#f99b07" />
                    </ActionIcon>
                  </Tooltip>
                </Group>
                <Button
                  variant="filled"
                  color="bright-sun"
                  fullWidth
                  size="md"
                  mt={10}
                  onClick={() => {
                    setSettingsOpened(false);
                    navigate('/change-password');
                  }}
                  styles={{
                    root: {
                      backgroundColor: '#e88a05',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '16px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                      transition: 'background 0.2s',
                      '&:hover': { backgroundColor: '#b86a04' },
                    },
                  }}
                >
                  Change Password
                </Button>
                <Button
                  variant="filled"
                  color="bright-sun"
                  fullWidth
                  size="md"
                  mt={10}
                  onClick={() => {
                    setSettingsOpened(false);
                    handleLogout();
                  }}
                  styles={{
                    root: {
                      backgroundColor: '#f99b07',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '16px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      '&:hover': { backgroundColor: '#dd7302' },
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      {/* Notifications Popover */}
      <Popover
        opened={opened}
        onChange={setOpened}
        width={340}
        position="bottom-end"
        offset={12}
        shadow="xl"
        transitionProps={{ transition: 'scale-y', duration: 200 }}
      >
        <Popover.Target>
          <button
            className="bg-masala-900 p-2 rounded-full hover:bg-masala-800 transition relative"
            onClick={() => setOpened((o) => !o)}
          >
            <Indicator
              color="bright-sun"
              offset={6}
              size={8}
              processing
              disabled={!notifUnread}
            >
              <IconBell stroke={1.5} />
              {unreadCount > 0 && (
                <Badge
                  color="yellow"
                  size="xs"
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    pointerEvents: 'none',
                  }}
                >
                  {unreadCount}
                </Badge>
              )}
            </Indicator>
          </button>
        </Popover.Target>
        <Popover.Dropdown>
          <Group position="apart" mb={8}>
            <Text fw={600}>Notifications</Text>
            <div>
              <Button
                size="xs"
                variant="subtle"
                color="bright-sun"
                onClick={markAllAsRead}
                disabled={!notifUnread || notifLoading}
                mr={4}
              >
                Mark all as read
              </Button>
              <Button
                size="xs"
                variant="subtle"
                color="red"
                onClick={clearAll}
                disabled={notifications.length === 0 || notifLoading}
              >
                Clear all
              </Button>
            </div>
          </Group>
          {notifLoading ? (
            <Group position="center" py={20}>
              <Loader size="sm" />
            </Group>
          ) : notifError ? (
            <Text color="red" size="sm">{notifError}</Text>
          ) : notifications.length === 0 ? (
            <Text size="sm" color="dimmed">No notifications</Text>
          ) : (
            <ScrollArea h={220}>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-2 rounded mb-1 flex justify-between items-start ${notif.read ? 'bg-masala-900 text-gray-400' : 'bg-masala-800 text-white font-semibold'}`}
                >
                  <div>
                    <Text size="sm">{notif.message}</Text>
                    <Text size="xs" color="dimmed">{new Date(notif.createdAt).toLocaleString()}</Text>
                  </div>
                  {!notif.read && (
                    <Button
                      size="xs"
                      variant="light"
                      color="bright-sun"
                      ml={8}
                      onClick={() => markAsRead(notif.id)}
                      compact
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              ))}
            </ScrollArea>
          )}
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default HeaderUserSection;
