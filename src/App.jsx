import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';
import './styles/App.css';
import Landingpage from './pages/Landingpage';
import Navigation from './components/Navigation';
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { toggleNav } from "./redux/features/NavbarSlice";

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
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}

export default App;
