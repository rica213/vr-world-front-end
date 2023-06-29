import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';
import './styles/App.css';
import Landingpage from './pages/Landingpage';
import Navigation from './components/Navigation';

function App() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/';
  return (
    <main>
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
