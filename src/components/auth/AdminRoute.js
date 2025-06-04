import { Navigate } from 'react-router-dom';
// import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';

// auth_tier ----------------------------------------------------------------------
const auth_tier_1 = ['admin'];
// const auth_tier_2 = [auth_tier_1, 'gov', 'partner'].flat();
// const auth_tier_3 = [auth_tier_2, 'guest'].flat();
// const auth_tier_4 = [auth_tier_3, 'user', 'user2', 'user3'].flat();

// AdminRoute ----------------------------------------------------------------------
const AdminRoute = ({ element: Component, ...rest }) => {
  // ...rest - Collects all other props into an object called rest
  // Component = UserPage
  // rest = {} (empty object since no other props were passed)
  const { user, logout } = useAuth();
  //   const { username } = useParams();

  const isAuthenticated = user && auth_tier_1.includes(user.role);

  if (!isAuthenticated) {
    logout();
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default AdminRoute;
