import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import NoMatch from '../pages/NoMatch';
import '../styles/App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
