import { useEffect, useState } from 'react';
import { companyAddEmployee, companyGetEmployees, companyRemoveEmployee } from '../services/company/portalApi';
import Loader from '../components/Loader';

const emptyEmployee = { name: '', email: '', password: '', designation: '', phoneNumber: '' };

export default function CompanyEmployees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyEmployee);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEmployees = () => {
    setLoading(true);
    companyGetEmployees()
      .then((response) => setEmployees(Array.isArray(response.data) ? response.data : []))
      .catch(() => setError('Could not load employees.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await companyAddEmployee(form);
      setForm(emptyEmployee);
      loadEmployees();
    } catch (err) {
      const data = err?.response?.data;
      setError(typeof data === 'string' ? data : data?.message || 'Could not add employee.');
    }
  };

  const removeEmployee = async (id) => {
    if (!window.confirm('Remove this employee?')) return;
    await companyRemoveEmployee(id);
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  if (loading) return <div className="page"><Loader /></div>;

  return (
    <div className="page">
      <div className="card"><h2 style={{ fontSize: 22 }}>Company Employees</h2></div>
      {error && <div className="alert alert-error">{error}</div>}
      <form className="card section-gap" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          {Object.keys(emptyEmployee).map((key) => (
            <div className="form-group" key={key}>
              <label className="form-label">{key}</label>
              <input className="form-input" type={key === 'password' ? 'password' : 'text'} value={form[key]} onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))} required={['name', 'email', 'password'].includes(key)} />
            </div>
          ))}
        </div>
        <button className="btn btn-primary">Add Employee</button>
      </form>
      <div className="grid grid-3 section-gap">
        {employees.map((employee) => (
          <div className="card user-card" key={employee.id}>
            <h3>{employee.name || employee.email}</h3>
            <p className="meta">{employee.role}</p>
            <p className="meta">{employee.designation || 'Team member'}</p>
            <p className="meta">{employee.email}</p>
            <button className="btn btn-danger btn-sm" onClick={() => removeEmployee(employee.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
