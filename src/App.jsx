import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';
import './styles/App.css';
import Landingpage from './pages/Landingpage';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landingpage />} />
      <Route exact path="home" element={<Homepage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
