import { useState, useEffect } from 'react';
import { adminGetUsers, adminDeleteUser, adminUpdateUser, adminCreateUser } from '../api';
import { isAdmin } from '../auth';
import { getCurrentUser } from '../auth';
import Loader from '../components/Loader';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ userName: '', email: '', password: '', role: 'USER' });
  const [editUser, setEditUser] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = () => {
    adminGetUsers().then(res => { setUsers(res.data); setLoading(false); }).catch(() => { setError('Failed to load users.'); setLoading(false); });
  };

  if (!isAdmin(currentUser)) return <div className="page"><div className="alert alert-error">Access denied.</div></div>;
  if (loading) return <div className="page"><Loader /></div>;

  const filtered = users.filter(u => {
    const matchRole = roleFilter === 'All' || u.roles?.some(r => r.toLowerCase() === roleFilter.toLowerCase());
    const matchSearch = !search || u.userName?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const handleDelete = (username) => {
    if (!window.confirm(`Delete user "${username}"?`)) return;
    adminDeleteUser(username).then(() => setUsers(prev => prev.filter(u => u.userName !== username))).catch(() => alert('Failed to delete.'));
  };

  const handleCreate = async () => {
    try {
      await adminCreateUser({ ...newUser, roles: [newUser.role] });
      setShowCreate(false);
      setNewUser({ userName: '', email: '', password: '', role: 'USER' });
      fetchUsers();
    } catch { alert('Failed to create user.'); }
  };

  const handleUpdate = async () => {
    try {
      await adminUpdateUser(editUser.userName, { ...editUser, roles: [editUser.role] });
      setEditUser(null);
      fetchUsers();
    } catch { alert('Failed to update user.'); }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="flex-between">
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>All Users</h2>
          <button className="btn btn-success btn-sm" onClick={() => setShowCreate(true)}>+ Create User</button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <input className="form-input" style={{ width: 240 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="form-select" style={{ width: 140 }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="RECRUITER">Recruiter</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {filtered.length === 0 ? (
        <div className="empty-state">No users found.</div>
      ) : (
        <div className="grid grid-3 section-gap">
          {filtered.map(u => (
            <div key={u.id} className="card user-card">
              <h3>{u.userName || u.email}</h3>
              <p className="meta">{u.email}</p>
              <p className="meta">Role: {u.role || u.roles?.join(', ') || 'None'}</p>
              <div className="actions">
                <button className="btn btn-primary btn-sm" onClick={() => setEditUser({ ...u, role: u.roles?.[0] || '' })}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.userName)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Create New User</h3>
            <div className="form-group"><label className="form-label">Username</label><input className="form-input" value={newUser.userName} onChange={e => setNewUser(p => ({ ...p, userName: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={newUser.password} onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Role</label><select className="form-select" value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}><option value="USER">User</option><option value="ADMIN">Admin</option><option value="RECRUITER">Recruiter</option></select></div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-success" onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      )}

      {editUser && (
        <div className="modal-overlay" onClick={() => setEditUser(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Update User</h3>
            <div className="form-group"><label className="form-label">Username</label><input className="form-input" value={editUser.userName} disabled /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={editUser.email || ''} onChange={e => setEditUser(p => ({ ...p, email: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Role</label><select className="form-select" value={editUser.role} onChange={e => setEditUser(p => ({ ...p, role: e.target.value }))}><option value="USER">User</option><option value="ADMIN">Admin</option><option value="RECRUITER">Recruiter</option></select></div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setEditUser(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
