import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const AuthRoute = ({ element: Component, ...rest }) => {
  // ...rest - Collects all other props into an object called rest
  // Component = UserPage
  // rest = {} (empty object since no other props were passed)
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
