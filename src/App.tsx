import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './routes/index';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
