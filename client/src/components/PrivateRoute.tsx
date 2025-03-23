
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 

const PrivateRoute = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
