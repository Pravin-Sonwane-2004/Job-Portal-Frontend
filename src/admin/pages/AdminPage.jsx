import React from 'react';
import { Navigate } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';

// Replace this with your real authentication logic
const isLoggedIn = () => {
  return !!localStorage.getItem('authToken');
};

const AdminPage = () => {
  if (!isLoggedIn()) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <PageWrapper>
        <h1 className="text-3xl text-accent-400 font-bold">Admin Dashboard</h1>
    </PageWrapper>
  );
};

export default AdminPage;
