import React, { useState } from 'react';
import { adminCreateJob } from '../all services/getJfBackendService';
import {
  TextInput,
  Button,
  Title,
  Stack,
  Text,
  Container,
  Paper,
  Group,
} from '@mantine/core';
import {
  IconBriefcase,
  IconMapPin,
  IconCurrencyDollar,
  IconBuilding,
} from '@tabler/icons-react';
import { ADMIN_CREATE_JOB } from '../all services/getJfBackendService';

const UploadJob = () => {
  const [form, setForm] = useState({
    title: '',
    location: '',
    salary: '',
    company: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.currentTarget?.value || e });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await adminCreateJob({
        title: form.title,
        location: form.location,
        salary: form.salary,
        company: form.company,
      });
      setSuccess(true);
      setForm({
        title: '',
        location: '',
        salary: '',
        company: '',
      });
    } catch (err) {
      const backendMsg = err?.response?.data?.message || err?.response?.data || err?.message;
      setError(backendMsg ? `Failed to upload job: ${backendMsg}` : 'Failed to upload job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-masala-950 px-2 py-6 md:px-4 md:py-8">
      <Container size="xl" style={{ maxWidth: '600px', width: '100%' }}>
        <Paper
          shadow="md"
          radius="xl"
          p="xl"
          withBorder
        >
          <Title
            align="center"
            order={2}
            className="text-bright-sun-500 font-bold mb-4"
            style={{ fontSize: '2rem' }}
          >
            Upload Job
          </Title>

          {success && (
            <Text align="center" color="green" className="mb-3">
              Job uploaded successfully!
            </Text>
          )}
          {error && (
            <Text align="center" color="red" className="mb-3">
              {error}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <TextInput
                label="Job Title"
                icon={<IconBriefcase size={16} />}
                value={form.title}
                onChange={handleChange('title')}
                placeholder="Enter job title"
                required
                size="md"
                autoComplete="off"
              />

              <Group grow spacing="md">
                <TextInput
                  label="Location"
                  icon={<IconMapPin size={16} />}
                  value={form.location}
                  onChange={handleChange('location')}
                  placeholder="Enter location"
                  required
                  size="md"
                  autoComplete="off"
                />
                <TextInput
                  label="Company"
                  icon={<IconBuilding size={16} />}
                  value={form.company}
                  onChange={handleChange('company')}
                  placeholder="Enter company name"
                  required
                  size="md"
                  autoComplete="off"
                />
              </Group>

              <TextInput
                label="Salary"
                icon={<IconCurrencyDollar size={16} />}
                value={form.salary}
                onChange={handleChange('salary')}
                placeholder="Enter salary"
                required
                size="md"
                autoComplete="off"
              />

              <Button
                type="submit"
                fullWidth
                size="md"
                styles={{
                  root: {
                    backgroundColor: '#f99b07',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '16px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&:hover': { backgroundColor: '#dd7302' },
                  },
                }}
              >
                Upload Job
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default UploadJob;
