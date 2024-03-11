import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../Context/context';
import { toast } from 'react-toastify';

const RequiredAuth = () => {
  const [user] = useUser();
  return (
    <>
      {user ? (
        <Outlet />
      ) : (
        toast.error('Please login first!') && <Navigate to="/" replace />
      )}
    </>
  );
};

export default RequiredAuth;
