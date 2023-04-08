import { useState, useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './routes/index';
import { Header } from './components/index';
import useWindowDimensions from './utils/useWindowDimensions';

import './App.css';

function App() {
  const [mobile, setmobile] = useState(false);
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width <= 450) {
      setmobile(true);
    } else {
      setmobile(false);
    }
  }, [width]);

  return (
    <>
      {mobile && ''} <Header mobile={mobile} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
