import { Route, Routes, useLocation } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';
import './styles/App.css';
import Landingpage from './pages/Landingpage';
import ReservationNew from './pages/ReservationNew';
import Navigation from './components/Navigation';
import { toggleNav } from './redux/features/NavbarSlice';
import Authentication from './pages/Authentication';
import MyReservations from './pages/MyReservations';
import AdminPages from './pages/AdminPages';
import AdminOutlet from './pages/AdminOutlet';
import RemoveStudios from './pages/RemoveStudios';

function App() {
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
        <Route exact path="/my-reservations" element={<MyReservations />} />
        <Route exact path="/reservations/new" element={<ReservationNew />} />
        <Route
          path="admin"
          element={(
            <AdminPages>
              <AdminOutlet />
            </AdminPages>
          )}
        >
          <Route index element={<RemoveStudios />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
