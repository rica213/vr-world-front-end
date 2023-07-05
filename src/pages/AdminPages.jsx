import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AdminPages = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user?.admin) {
    return <Navigate to="/home" />;
  }
  return children;
};
export default AdminPages;
