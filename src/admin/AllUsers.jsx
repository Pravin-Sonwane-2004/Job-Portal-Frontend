import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Input,
  Select,
  Button,
  Text,
  Box,
  Group,
  Modal,
  SimpleGrid,
  Divider,
  Center,
  Paper,
} from '@mantine/core';
import { IconTrash, IconPlus, IconEdit, IconUser, IconMail, IconShield, IconSearch } from '@tabler/icons-react';
import { adminGetAllUsers, adminDeleteUser, adminCreateAdminUser, adminUpdateUser } from '../all services/getJfBackendService';
import { RingLoader } from '../loader/RingLoader';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ userName: '', email: '', password: '', roles: [] });
  const [createError, setCreateError] = useState('');
  const [creating, setCreating] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editError, setEditError] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    adminGetAllUsers()
      .then((res) => {
        console.log('Fetched users:', res.data); // Debug: check user structure
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;
    if (roleFilter !== 'All') {
      filtered = filtered.filter((user) =>
        user.roles?.some((role) => role.toLowerCase() === roleFilter.toLowerCase())
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter]);

  const handleDelete = (username) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    adminDeleteUser(username)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.userName !== username));
      })
      .catch((err) => alert(err.message));
  };

  const handleCreateUser = async () => {
    setCreating(true);
    setCreateError('');
    try {
      await adminCreateAdminUser({ ...newUser, roles: [newUser.roles] });
      setCreateModalOpen(false);
      setNewUser({ userName: '', email: '', password: '', roles: [] });
      fetchUsers();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user, roles: user.roles?.[0] || '' });
    setEditModalOpen(true);
    setEditError('');
  };

  const handleUpdateUser = async () => {
    setUpdating(true);
    setEditError('');
    try {
      await adminUpdateUser(editUser.userName, { ...editUser, roles: [editUser.roles] });
      setEditModalOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Center p="md">
        <RingLoader size="48px" color="#228be6" />
      </Center>
    );
  }

  return (
    <div className="min-h-[150vh] bg-masala-950 font-poppins py-8">
      <Container size="100vw">
        <Paper shadow="xl" radius="lg" p="md" mb="md">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
            {/* Left: Search */}
            <div className="flex items-center gap-2">
              <Input
                icon={<IconSearch size={16} />}
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 250 }}
              />
            </div>
            {/* Right: Sort and Create */}
            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <IconShield size={16} /> Sort by role:
              </label>
              <Select
                id="sort-select"
                data={[
                  { value: 'All', label: 'All' },
                  { value: 'ADMIN', label: 'Admin' },
                  { value: 'USER', label: 'User' },
                  { value: 'RECRUITER', label: 'Recruiter' },
                ]}
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Filter by role"
                style={{ width: 180 }}
                icon={<IconShield size={16} />}
              />
              <Button leftIcon={<IconPlus size={16} />} color="green" onClick={() => setCreateModalOpen(true)}>
                Create User
              </Button>
            </div>
          </div>
        </Paper>

        <Divider mb="md" />

        {/* Modal for Create */}
        <Modal opened={createModalOpen} onClose={() => setCreateModalOpen(false)} title={<Group><IconPlus size={18} />Create New User</Group>} centered>
          <Input
            icon={<IconUser size={16} />}
            placeholder="Username"
            value={newUser.userName}
            onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
            mb="sm"
          />
          <Input
            icon={<IconMail size={16} />}
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            mb="sm"
          />
          <Input
            placeholder="Password"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            mb="sm"
          />
          <Select
            data={[
              { value: 'ADMIN', label: 'Admin' },
              { value: 'USER', label: 'User' },
              { value: 'RECRUITER', label: 'Recruiter' },
            ]}
            placeholder="Select role"
            value={newUser.roles}
            onChange={(role) => setNewUser({ ...newUser, roles: role })}
            mb="sm"
            icon={<IconShield size={16} />}
          />
          {createError && <Text color="red" size="sm" mb="sm">{createError}</Text>}
          <Group mt="md" position="right">
            <Button variant="default" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
            <Button color="green" loading={creating} onClick={handleCreateUser}>Create</Button>
          </Group>
        </Modal>

        {/* Modal for Edit */}
        <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title={<Group><IconEdit size={18} />Update User</Group>} centered>
          <Input
            icon={<IconUser size={16} />}
            placeholder="Username"
            value={editUser?.userName || ''}
            disabled
            mb="sm"
          />
          <Input
            icon={<IconMail size={16} />}
            placeholder="Email"
            value={editUser?.email || ''}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            mb="sm"
          />
          <Input
            placeholder="Password (leave blank to keep unchanged)"
            type="password"
            value={editUser?.password || ''}
            onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
            mb="sm"
          />
          <Select
            data={[
              { value: 'ADMIN', label: 'Admin' },
              { value: 'USER', label: 'User' },
              { value: 'RECRUITER', label: 'Recruiter' },
            ]}
            placeholder="Select role"
            value={editUser?.roles || ''}
            onChange={(role) => setEditUser({ ...editUser, roles: role })}
            mb="sm"
            icon={<IconShield size={16} />}
          />
          {editError && <Text color="red" size="sm" mb="sm">{editError}</Text>}
          <Group mt="md" position="right">
            <Button variant="default" onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button color="blue" loading={updating} onClick={handleUpdateUser}>Update</Button>
          </Group>
        </Modal>

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <Center className="h-60 flex flex-col">
            <Text size="xl" color="dimmed">😕 No users match your filters!</Text>
            <Text size="sm" color="gray">Try adjusting your search or role filter.</Text>
          </Center>
        ) : (
          <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 'lg', cols: 2 }, { maxWidth: 'sm', cols: 1 }]}>
            {filteredUsers.map((user) => (
              <Box
                key={user.id}
                p="md"
                sx={(theme) => ({
                  border: `1px solid ${theme.colors.gray[3]}`,
                  borderRadius: theme.radius.md,
                  boxShadow: theme.shadows.xs,
                })}
                className="hover:shadow-md transition"
              >
                <Group spacing={6} mb={4}>
                  <IconUser size={18} />
                  <Text weight={600}>{user.userName || user.email}</Text>
                </Group>
                <Group spacing={6} mb={2}>
                  <IconMail size={16} />
                  <Text color="dimmed" size="sm">{user.email}</Text>
                </Group>
                <Group spacing={6} mb={2}>
                  <IconShield size={16} />
                  <Text size="sm">Role: {user.role || 'None'}</Text>
                </Group>
                <Group mt="md" position="right">
                  <Button
                    size="xs"
                    color="blue"
                    leftIcon={<IconEdit size={16} />}
                    variant="outline"
                    onClick={() => handleEditUser(user)}
                  >
                    Update
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    leftIcon={<IconTrash size={16} />}
                    onClick={() => handleDelete(user.userName)}
                  >
                    Delete
                  </Button>
                </Group>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </div>
  );
};

export default AllUsers;
