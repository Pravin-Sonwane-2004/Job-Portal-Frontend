import React, { useEffect, useState } from 'react';
import {
  Container,
  TextInput,
  Textarea,
  Button,
  Avatar,
  Group,
  Loader,
  Notification,
  Card,
  Title,
  Text,
} from '@mantine/core';
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
        // Optionally, check if the returned user matches the logged-in user (if you store username/email in localStorage)
        // If not, redirect or show error
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
        // Optionally, redirect to login or show error
        // navigate('/login');
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

    // Prepare data for backend (convert skills to array)
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
    // Only allow admins to update 'verified'
    const userRole = sessionStorage.getItem('role') || localStorage.getItem('role');
    if (userRole === 'ADMIN') {
      payload.verified = formData.verified;
    }

    // If you want to support avatar upload, you need to handle it separately (not shown here)
    try {
      const token = sessionStorage.getItem('jwt');
      await axios.put(UPDATE_PROFILE, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSuccess(true);
      // Notify other components (like Header) that profile was updated
      window.dispatchEvent(new Event('profileUpdated'));
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      if (err.response) {
        // Backend returned an error response
        console.error('Backend error:', err.response.data);
        setError(`Failed to update profile: ${err.response.data}`);
      } else {
        // Network or other error
        console.error(err);
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container fluid className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader size="lg" color="accent" />
      </Container>
    );
  }

  return (
    <Container size="xl" className="min-h-screen py-2 bg-neutral-950 font-poppins flex items-center justify-center">
      <Card
        shadow="xl"
        radius="lg"
        padding="xl"
        className="bg-neutral-950 border border-neutral-700 w-full max-w-4xl mx-auto"
        style={{ width: '100%', minWidth: 0 }}
      >
        <Title order={2} align="center" className="text-accent-400 mb-4">
          Edit Profile
        </Title>
        <Text align="center" color="white" className="mb-6">
          Update your profile information
        </Text>

        <form onSubmit={handleSubmit}>
          <Group justify="left" className="mb-6">
            <Avatar
              src={formData.avatarUrl || '/avatars/default.png'}
              size={100}
              radius={100}
              className="border-4 border-accent-400 shadow-lg"
            />
          </Group>

          <div className="mb-6 text-center text-sm text-neutral-300">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="cursor-pointer file:mr-2 file:px-3 file:py-1 file:rounded-md file:border-none file:bg-accent-400 file:text-black"
            />
          </div>

          <Group grow align="flex-start" className="mb-6" spacing="xl">
            <div className="w-full">
              <TextInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-4"
                required
                leftSection={<IconUser size={18} />}
              />
              <TextInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mb-4"
                required
                leftSection={<IconMail size={18} />}
              />
              <TextInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mb-4"
                leftSection={<IconMapPin size={18} />}
              />
              <Textarea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                minRows={3}
                className="mb-4"
                leftSection={<IconInfoCircle size={18} />}
              />
            </div>
            <div className="w-full">
              <TextInput
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mb-4"
                placeholder="e.g. +1 234 567 8901"
                leftSection={<IconPhone size={18} />}
              />
              <TextInput
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="mb-4"
                placeholder="LinkedIn profile URL"
                leftSection={<IconBrandLinkedin size={18} />}
              />
              <TextInput
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="mb-6"
                placeholder="Comma separated (e.g. React, Node.js, SQL)"
                leftSection={<IconListCheck size={18} />}
              />
            </div>
          </Group>

          <TextInput
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="mb-4"
            placeholder="e.g. Software Engineer"
          />

          <div className="mb-6">
            <label style={{ color: '#fff', marginRight: '1em' }}>
              <input
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={e => setFormData({ ...formData, verified: e.target.checked })}
                style={{ marginRight: '0.5em' }}
              />
              Verified
            </label>
          </div>

          <Group justify="left">
            <Button
              type="submit"
              color="accent"
              loading={saving}
              className="px-8"
              leftSection={<IconDeviceFloppy size={18} />}
            >
              Save Changes
            </Button>
          </Group>
        </form>

        {success && (
          <Notification icon={<IconCheck size={18} />} color="teal" title="Success" mt="lg">
            Profile updated successfully!
          </Notification>
        )}
        {error && (
          <Notification icon={<IconX size={18} />} color="red" title="Error" mt="lg">
            {error}
          </Notification>
        )}
      </Card>
    </Container>
  );
};

export default EditProfile;
