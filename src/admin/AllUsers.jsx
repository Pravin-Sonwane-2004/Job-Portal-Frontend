import React, { useEffect, useState } from 'react';
import { IconTrash, IconPlus, IconEdit, IconUser, IconMail, IconShield, IconSearch } from '@tabler/icons-react';
import { adminGetAllUsers, adminDeleteUser, adminCreateAdminUser, adminUpdateUser } from '../services/jobPortalApi';
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <RingLoader size="48px" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
            {/* Left: Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconSearch size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by username or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                />
              </div>
            </div>
            {/* Right: Sort and Create */}
            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="sort-select" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <IconShield size={16} /> Sort by role:
              </label>
              <select
                id="sort-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-40"
              >
                <option value="All">All</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="RECRUITER">Recruiter</option>
              </select>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <IconPlus size={16} />
                Create User
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mb-6"></div>

        {/* Modal for Create */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center gap-2 mb-4">
                <IconPlus size={18} className="text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create New User</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconUser size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={newUser.userName}
                      onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconMail size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <select
                    value={newUser.roles}
                    onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                    <option value="RECRUITER">Recruiter</option>
                  </select>
                </div>

                {createError && (
                  <div className="text-red-600 dark:text-red-400 text-sm">{createError}</div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateUser}
                    disabled={creating}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Edit */}
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center gap-2 mb-4">
                <IconEdit size={18} className="text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Update User</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconUser size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={editUser?.userName || ''}
                      disabled
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconMail size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={editUser?.email || ''}
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password (leave blank to keep unchanged)</label>
                  <input
                    type="password"
                    placeholder="Password (leave blank to keep unchanged)"
                    value={editUser?.password || ''}
                    onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <select
                    value={editUser?.roles || ''}
                    onChange={(e) => setEditUser({ ...editUser, roles: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                    <option value="RECRUITER">Recruiter</option>
                  </select>
                </div>

                {editError && (
                  <div className="text-red-600 dark:text-red-400 text-sm">{editError}</div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateUser}
                    disabled={updating}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="text-2xl text-slate-400 dark:text-slate-500 mb-2">😕 No users match your filters!</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or role filter.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <IconUser size={18} className="text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{user.userName || user.email}</h3>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <IconMail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <IconShield size={16} />
                    <span>Role: {user.role || user.roles?.join(', ') || 'None'}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-1"
                  >
                    <IconEdit size={14} />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.userName)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-1"
                  >
                    <IconTrash size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;

