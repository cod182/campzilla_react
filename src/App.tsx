import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './routes/index';
import { Header } from './components/index';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
