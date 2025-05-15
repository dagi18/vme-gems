
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required, or user has the required role
  if (
    allowedRoles.length === 0 ||
    allowedRoles.includes(user.role) ||
    user.role === 'admin' // Admin can access everything
  ) {
    return <>{children}</>;
  }

  // If the user doesn't have the required role, redirect to unauthorized page
  return <Navigate to="/unauthorized" replace />;
};

export default RouteGuard;
