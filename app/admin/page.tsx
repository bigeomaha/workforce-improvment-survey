'use client';

import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import AdminLogin from '@/components/AdminLogin';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    if (authenticated) {
      sessionStorage.setItem('admin_token', 'authenticated');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_token');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
