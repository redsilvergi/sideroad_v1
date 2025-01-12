import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const AuthRoute = ({ element: Component, ...rest }) => {
  const { user, logout } = useAuth();
  const { username } = useParams();

  const isAuthenticated = user && user.username === username;

  if (!isAuthenticated) {
    logout();
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default AuthRoute;
