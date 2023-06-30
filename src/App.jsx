import { Route, Routes, useLocation } from 'react-router-dom';
import { CgMenuGridO } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';
import './styles/App.css';
import Landingpage from './pages/Landingpage';
import Navigation from './components/Navigation';
import { toggleNav } from './redux/features/NavbarSlice';
import Authentication from './pages/Authentication';
import MyReservations from './pages/MyReservations';

function App() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/';
  const dispatch = useDispatch();

  return (
    <main>
      {!hideNavigation && (
        <CgMenuGridO
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
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}

export default App;
