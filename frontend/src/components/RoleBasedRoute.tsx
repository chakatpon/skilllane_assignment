import React from 'react';
import { Navigate } from 'react-router-dom';

export type Role = 'admin' | 'librarian' | 'member';

interface Props {
  role: Role;
  allowed: Role[];
  children: React.ReactNode;
}

export const RoleBasedRoute: React.FC<Props> = ({ role, allowed, children }) => {
  if (!allowed.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
