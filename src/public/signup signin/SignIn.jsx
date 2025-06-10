import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  PasswordInput,
  TextInput,
  Text,
  Select,
  Title,
  Stack,
} from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons-react';
import { LOGIN_URL } from '../../all services/getJfBackendService';

const SignIn = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('jwt')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (response.ok && data && data.token) {
        sessionStorage.setItem('jwt', data.token);

        switch (role) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'RECRUITER':
            navigate('/recruiter');
            break;
          default:
            navigate('/user');
            break;
        }
      } else {
        // If not JSON or no token, treat as error message
        const message = (data && data.message) || text;
        if (message.toLowerCase().includes('email does not exist')) {
          setError('Email does not exist.');
        } else if (message.toLowerCase().includes('incorrect password')) {
          setError('Incorrect password.');
        } else {
          setError(message || 'Login failed.');
        }
      }
    } catch {
      setError('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-masala-950 px-4">
      <div className="w-full max-w-xl bg-masala-950 border border-bright-sun-300 shadow-lg rounded-xl p-6">
        <Title align="center" order={2} className="text-bright-sun-500 font-bold mb-4">
          Sign In to Your Account
        </Title>

        {error && (
          <Text color="red" align="center" className="mb-3">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              icon={<IconUser size={16} />}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              size="sm"
            />

            <PasswordInput
              icon={<IconLock size={16} />}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              size="sm"
            />

            <Select
              label="Role"
              value={role}
              onChange={setRole}
              data={[
                { value: 'USER', label: 'User' },
                { value: 'ADMIN', label: 'Admin' },
                { value: 'RECRUITER', label: 'Recruiter' },
              ]}
              required
              size="sm"
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="md"
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
              Sign In
            </Button>
          </Stack>

          <Text align="center" size="sm" mt="md" className="text-masala-300">
            Don’t have an account?{' '}
            <button
              type="button"
              className="text-bright-sun-400 hover:underline focus:outline-none"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </Text>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
