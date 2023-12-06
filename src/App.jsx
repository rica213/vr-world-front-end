import { Route, Routes, useLocation } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';
import './styles/App.css';
import Landingpage from './pages/Landingpage';

import Navigation from './components/Navigation';
import { toggleNav } from './redux/features/NavbarSlice';
import Authentication from './pages/Authentication';
import MyReservations from './pages/MyReservations';
import AdminPages from './pages/AdminPages';
import AdminOutlet from './pages/AdminOutlet';
import RemoveStudios from './pages/RemoveStudios';
import AddStudio from './pages/AddStudio';
import Studiodetails from './pages/StudioDetailspage';
import ProtectedPages from './pages/ProtectedPages';
import UserOutlet from './pages/UserOutlet';

const App = () => {
  const location = useLocation();
  const hideNavigation = location.pathname === '/';
  const dispatch = useDispatch();

  return (
    <>
      {!hideNavigation && (
        <HiMenuAlt4
          className="menu-icon"
          onClick={() => dispatch(toggleNav())}
        />
      )}
      {!hideNavigation && <Navigation />}
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route exact path="/home" element={<Homepage />} />
        <Route exact path="/auth" element={<Authentication />} />
        <Route exact path="studios/:id" element={<Studiodetails />} />
        <Route
          path="reservations"
          element={(
            <ProtectedPages>
              <UserOutlet />
            </ProtectedPages>
          )}
        >
          <Route
            exact
            path="/reservations/my-reservations"
            element={<MyReservations />}
          />
        </Route>
        <Route
          path="studio"
          element={(
            <AdminPages>
              <AdminOutlet />
            </AdminPages>
          )}
        >
          <Route index element={<RemoveStudios />} />
          <Route exact path="/studio/new" element={<AddStudio />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
