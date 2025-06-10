import React, { useEffect, useState } from 'react';
import {
  Container,
  Group,
  Avatar,
  Text,
  Button,
  Divider,
  Card,
  Loader,
  Tooltip,
  Badge,
  Notification,
} from '@mantine/core';
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
      <Container fluid className="min-h-screen flex items-center justify-center bg-masala-950">
        <Loader size="lg" color="yellow" />
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container fluid className="min-h-screen flex items-center justify-center bg-masala-950">
        <div className="flex flex-col items-center">
          <Text color="red" className="mb-4">Failed to load profile data.</Text>
          <Button
            color="bright-sun"
            variant="outline"
            onClick={() => navigate('/edit-profile')}
          >
            Create/Edit Profile
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container
      size="md"
      fluid
      className="min-h-screen py-10 bg-masala-950 font-poppins flex items-center justify-center"
      style={{ maxWidth: '100vw' }}
    >
      <Card
        shadow="xl"
        radius="lg"
        padding="xl"
        className="bg-masala-950 border border-gray-700 w-full max-w-2xl mx-auto hover:shadow-2xl transition-all duration-300"
        style={{ width: '100%', minWidth: 0 }}
      >
        <Group position="center" className="relative mb-3">
          <Avatar
            src={userData.avatarUrl || '/avatars/default.png'}
            size={100}
            radius="xl"
            alt={`${userData.name}'s profile picture`}
            className="border-4 border-bright-sun-400 shadow-xl transition-transform hover:scale-105"
          />
          <Text align="right" size="xl" weight={700} className="text-bright-sun-400 mb-1">
            {userData.name}
          </Text> 
        </Group>

        
        

        <Group position="center" mt="xs" mb="xs">
          <Badge
            variant="light"
            color={userData.verified ? 'teal' : 'gray'}
            leftSection={
              userData.verified ? <IconShieldCheck size={14} /> : <IconShieldX size={14} />
            }
          >
            {userData.verified ? 'Verified' : 'Not Verified'}
          </Badge>
        </Group>

        <Divider my="lg" />

        {/* Profile fields with icons */}
        <div className="p-0 text-sm text-gray-300 space-y-2">
          <p>
            <IconUser size={16} className="inline mr-2 text-bright-sun-400" />
            <span className="font-medium text-gray-400">Name:</span> {userData.name}
          </p>
          <p>
            <IconMail size={16} className="inline mr-2 text-bright-sun-400" />
            <span className="font-medium text-gray-400">Email:</span> {userData.email}
          </p>
          <p>
            <IconMapPin size={16} className="inline mr-2 text-bright-sun-400" />
            <span className="font-medium text-gray-400">Location:</span> {userData.location || 'N/A'}
          </p>
          <p>
            <IconInfoCircle size={16} className="inline mr-2 text-bright-sun-400" />
            <span className="font-medium text-gray-400">Bio:</span> {userData.bio || 'No bio added yet.'}
          </p>
          <p>
            <IconPhone size={16} className="inline mr-2 text-bright-sun-400" />
            <span className="font-medium text-gray-400">Phone:</span> {userData.phone || 'N/A'}
          </p>
          <p>
            <IconBrandLinkedin size={16} className="inline mr-2 text-bright-sun-400" />
            <span className="font-medium text-gray-400">LinkedIn:</span>{' '}
            {userData.linkedin ? (
              <a
                href={userData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bright-sun-400 underline"
              >
                {userData.linkedin}
              </a>
            ) : (
              'N/A'
            )}
          </p>
          <p>
            <IconListCheck size={16} className="inline mr-2 text-bright-sun-400" />
            <span className="font-medium text-gray-400">Skills:</span>{' '}
            {userData.skills && userData.skills.length
              ? Array.isArray(userData.skills)
                ? userData.skills.join(', ')
                : userData.skills
              : 'N/A'}
          </p>
        </div>

        <Group position="center" mt="xl" spacing="md">
          <Tooltip label="Edit your profile">
            <Button
              variant="light"
              leftSection={<IconEdit size={18} />}
              color="bright-sun"
              onClick={() => navigate('/edit-profile')}
              disabled={loading}
            >
              Edit Profile
            </Button>
          </Tooltip>
          {!userData.verified && (
            <Tooltip label="Request verification for your profile">
              <Button
                variant="outline"
                color="teal"
                leftSection={<IconShieldCheck size={18} />}
                loading={verifying}
                onClick={handleVerify}
                disabled={verifying}
              >
                Get Verified
              </Button>
            </Tooltip>
          )}
        </Group>

        {verifySuccess && (
          <Notification
            color="teal"
            title="Verification Requested"
            mt="lg"
            withCloseButton
            onClose={() => setVerifySuccess(false)}
          >
            Verification request sent! You are now verified.
          </Notification>
        )}
        {verifyError && (
          <Notification
            color="red"
            title="Verification Error"
            mt="lg"
            withCloseButton
            onClose={() => setVerifyError('')}
          >
            {verifyError}
          </Notification>
        )}
      </Card>
    </Container>
  );
};

export default Profile;
