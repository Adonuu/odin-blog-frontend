import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext'; // Assuming userContext is where your user info is stored

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // If the user is not logged in or does not have admin role, redirect to login
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return children; // Render children (the protected component)
};
