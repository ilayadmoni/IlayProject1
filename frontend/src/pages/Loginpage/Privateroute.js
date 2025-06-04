
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

// PrivateRoute component to protect routes from unauthenticated users
const Privateroute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // Not authenticated, redirect to login page
    return <Navigate to="/loginpage" replace />;
  }

  // Authenticated, render children
  return children;
};

export default Privateroute;
